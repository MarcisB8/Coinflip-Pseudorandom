pragma solidity 0.5.12;

contract Ownable {

    address internal owner;

    modifier onlyOwner(){
        require (msg.sender == owner, "Admin only");
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

}
