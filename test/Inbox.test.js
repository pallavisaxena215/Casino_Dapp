const assert = require('assert');
const ganache = require('ganache-cli');
const { linkBytecode } = require('solc');
const Web3 = require('web3'); 
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');



let accounts;
let inbox;
beforeEach( async ()=>{
    accounts = await web3.eth.getAccounts();

    inbox = await new web3.eth.Contract(JSON.parse(interface)) 
    .deploy({data: bytecode , arguments : ['Hi! Fo']})  
    .send({from : accounts[0], gas : '1000000'} )
});

describe('Inbox',()=>{
    it('Deploys Contract',()=>{
        
        console.log(inbox);
        assert.ok(inbox.options.address);

        it('has a default message',async ()=> {
           
            const message = await inbox.methods.message().call();

            assert.strictEqual(message,'Hi!!!!');
          
        });
       


        it('can change value of the contract', async ()=>{
           
           await inbox.methods.setMessage('Bye!!').send({from : accounts[0]});
           const message = await inbox.methods.message().call();
           assert.strictEqual(message,'Bye!!');

        });

    });

});