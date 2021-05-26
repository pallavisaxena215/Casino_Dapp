const path = require('path');// will hep in building a path from compile.js file to inbox.sol file
const fs = require ('fs');// to read the contents of the file we use file system (fs) module
const solc = require('solc');

const inboxPath = path.resolve(__dirname,'contracts', 'Inbox.sol'); //declaration of path 


const source= fs.readFileSync(inboxPath,'utf8');

module.exports=solc.compile(source,1).contracts[':Inbox'];
 // the exports statement will make the byte code of the contract to all the other files

