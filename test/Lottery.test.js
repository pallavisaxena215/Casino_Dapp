const assert = require('assert');
const ganache = require('ganache-cli');
const { linkBytecode } = require('solc');
const Web3 = require('web3'); 
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');



let accounts;
let lottery;
beforeEach( async ()=>{
    accounts = await web3.eth.getAccounts();

    lottery = await new web3.eth.Contract(JSON.parse(interface)) 
    .deploy({data: bytecode })  
    .send({from : accounts[0], gas : '1000000'} )
});

describe('Lottery',()=>{
    it('Deploys Contract ',()=>{
    
        assert.ok(lottery.options.address);

    });
let players;


    it('Adds multiple players', async() =>{
      await lottery.methods.enter().send({
          from: accounts[0],
          value: web3.utils.toWei('0.02', 'ether')
          
      });

      await lottery.methods.enter().send({
        from: accounts[1],
        value: web3.utils.toWei('0.02', 'ether')
        
    });


    

       players= await lottery.methods.getPlayers().call({
           from:accounts[0]
       });
      assert.strictEqual(players[0],accounts[0]);
      assert.strictEqual(players[1],accounts[1]);
      assert.strictEqual(2, players.length);
    });

    it('requires minimum ether to enter',async()=>{
    try{

        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02','ether')
    
        });
        assert(false);

    }
    catch(err){
        assert(err);
    }


    });


    


   

    
    

});

  
