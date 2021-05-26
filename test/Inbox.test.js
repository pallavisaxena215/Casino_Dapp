const assert = require('assert');
const ganache = require('ganache-cli');
const { linkBytecode } = require('solc');
const Web3 = require('web3'); //constructor used to create instances of the Web 3 library
// the assert and ganache are lower case as they are instances whereas Web3 is upper case because the constructor
//function are usually capatilized
//we can create multiple instances of Web 3 in the given project
// the purpose of each instance is to connect to a different ethereum network
const web3 = new Web3(ganache.provider());


// we require interface and byte code for implementation

const {interface, bytecode} = require('../compile');


/*
class Car{
    park() {
        return 'stopped';
    }

    drive(){
        return 'vroom';
    }
}

//let car;
//beforeEach( ()=>{
 //   car= new Car();
//});


/*beforeEach( ()=> {
 web3.eth.getAccounts() // we are using  a instance
 // web3 is adapted to work with different cryptocurrency
 // web3.eth indicaters the ethereum platform
 .then(fetchedAccounts => {
     console.log(fetchedAccounts);
 });
}) ;


// the first argument of the describe is just a string description
//to indicate what does the description does
/*describe('Car',()=>{

    it('if the car is parked',()=>{
        assert.strictEqual(car.park(),'st000opped');
    });

    it('if drive is executed',() =>{
        assert.strictEqual(car.drive(),'vroom');
    });

});
*/

let accounts;
let inbox;
beforeEach( async ()=>{
    accounts = await web3.eth.getAccounts();

    inbox = await new web3.eth.Contract(JSON.parse(interface)) //this is basically telling that there exists a contract
    .deploy({data: bytecode , arguments : ['Hi! Fo']})  // deploying the object returned by the contract with the byte
    // code and contructor string argument of contract Inbox
    //specifying the account for transaction and gas limit
    .send({from : accounts[0], gas : '1000000'} )
});

describe('Inbox',()=>{
    it('Deploys Contract',()=>{
        // to make sure that the account variable is working
        //console.log(accounts);
        console.log(inbox);

        //this will contain the address of the contract
        // the assert okay function will check whether the returned value is okay or not
        assert.ok(inbox.options.address);

        it('has a default message',async ()=> {
            //even though we are just calling a method ,ideally it should not take any lag time
            //but in reality it is realtively instantaneiusly as data is being fetched
            // and due to some processing
            //therefore we are using async keyword here
            const message = await inbox.methods.message().call();

            // here we define a variable me
            // the inbox is the instance of the Inbox Cintact
            //inbox.methods signifies all the functions defined inside the Contract Inbox
            //inbox.methods.message() indicates the message function defined inside our contract
            //inbox.methods.message().call() indicates the we are invoking a call to the message function
            assert.strictEqual(message,'Hi!!!!');
            //In the above code segment we initialize contract with Hi! string
            // we are checking whether the value returned by message is equal or not
        });



        it('can change value of the contract', async ()=>{
            // since we are updating the contract in the blockchain network
            // we need to send the value to the network which will require some transaction fee
            // ganache has already set up a list of accounts
           await inbox.methods.setMessage('Bye!!').send({from : accounts[0]});
           const message = await inbox.methods.message().call();
           assert.strictEqual(message,'Bye!!');

           // we don't need to assign this to a variable to check whether it is working fine or not
           // if the contract is not deployed then automatically error will be genrated
        });

    });

});

