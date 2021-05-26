const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface , bytecode} = require('./compile');
//here once again we difened a constructor HDWalletProvider that would
//create several instances 

// the provider specifies the infura node we need to connect to
const provider = new HDWalletProvider ( // paste the mnemonic of the configured ethereum wallet 
    'exotic cream swap young cabbage toy crazy release kick camera truly surprise ','https://rinkeby.infura.io/v3/75d83c9c3f8e4a549005762548356703'
   // the second argument is the link to the network we wish to connect to (in this case rinkeby test network)
);

// now we are intitializing the web3 with the provider to interact with the Rinkeby test network
const web3 = new Web3(provider);

const deploy= async () =>{
    const accounts = await web3.eth.getAccounts();
    // the mnemonic will just not retrive a single account. It can be used to retrive a list of account
   console.log('Attempting to deploy from account', accounts[0]);

   const result = await new web3.eth.Contract(JSON.parse(interface))
   .deploy({data :'0x' + bytecode, arguments: ['Hi!!']})
   .send({from : accounts[0], gas:'1000000'})

   console.log('Contract Deployed to', result.options.address);
};

deploy();