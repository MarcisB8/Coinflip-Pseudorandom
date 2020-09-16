import "./Destroyable.sol";
pragma solidity 0.5.12;

contract Coinflip is Destroyable{

    address public player;
    event result(bool);

    function random () public view returns (uint) {
        return now % 2;
    }

    function placeBet () public payable returns (bool){

        player = msg.sender;
        bool win;
        require (msg.value > 0, "Bet not entered");
        require (msg.value <= address(this).balance/5, "Bet limit exceeded");

        if (random() == 1){
            msg.sender.transfer(19*(msg.value)/10);
            win = true;
        }
        else {
            win = false;
        }
        emit result(win);
        return win;
    }

    function viewBalance () public view onlyOwner returns (uint) {
        return address(this).balance;
    }

    function deposit() public payable onlyOwner {
        require(msg.value > 0);
    }

    function withdraw (uint profit) public onlyOwner returns (uint){
        require (profit <= address(this).balance);
        msg.sender.transfer(profit*1e18);
        return profit;
    }
}
