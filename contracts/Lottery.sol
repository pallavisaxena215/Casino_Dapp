pragma solidity ^0.4.17;

contract Lottery{
    address public manager;
    address[] public players;
    
    
     constructor() public{
        manager= msg.sender;
        
    }
    
    function enter() public payable {
         require( msg.value > .01 ether);
        
         players.push(msg.sender);
         
         
    }
    
    
    function random() private returns (uint){
        returns uint(keccak256(block.difficulty,now,players));
    }
    
    function pickWinner() public returns (address){
        uint index= random % players.length;
        players[index].transfer(this.balance);
        
        return players[index];
    }
    
}
    
