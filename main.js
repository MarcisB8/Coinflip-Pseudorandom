var web3 = new Web3(Web3.givenProvider);
var contractInstance;

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
      contractInstance = new web3.eth.Contract(abi, "0x2849bFbB0936dfD03D4c7adCfEca8E51DB09B19F", {from: accounts[0]});
      console.log(contractInstance);
    });
    $("#bet").click(placeBet);
    $("#viewBalance").click(viewBalance);
    $("#depositButton").click(deposit);
    $("#withdrawButton").click(withdraw);
});

function placeBet(){
    var amount = $("#amount").val();
    var config = {
        value: web3.utils.toWei(amount,"ether")
    }
    var today = new Date();

    contractInstance.methods.placeBet().send(config)
    .on("transactionHash", function(hash){
        console.log(hash);
    })
    .on("confirmation", function(confirmationNr){
        console.log(confirmationNr);
    })
    .on("receipt", function(receipt){
        console.log(receipt);
        var win;
        if(receipt.events.result.returnValues[0] === true){
            alert("You won!");
            win = ("You won " + 9*amount/10 + " ETH");
        }
        else if(receipt.events.result.returnValues[0] === false){
            alert("You lost. Try again!");
            win = ("You lost " + amount + " ETH");
        }
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        $("#entries tbody").prepend($("<tr><td>"+ time +"</td><td>"+ win +"</td></tr>"));
    })
};

function viewBalance(){
      contractInstance.methods.viewBalance().call().then(function(res){
        console.log(res);
        $("#balance").text(res);
      })
};

function deposit(){
    var amount = $("#deposit").val();
    var config = {
        value: web3.utils.toWei(amount,"ether")
    }
    contractInstance.methods.deposit().send(config)
    .on("transactionHash", function(hash){
        console.log(hash);
    })
    .on("confirmation", function(confirmationNr){
        console.log(confirmationNr);
    })
};

function withdraw(){

    var profitETH = $("#withdraw").val();

    contractInstance.methods.withdraw(profitETH).send(profitETH)
    .on("transactionHash", function(hash){
        console.log(hash);
    })
    .on("confirmation", function(confirmationNr){
        console.log(confirmationNr);
    })
};

 function darkMode() {   /* Toggles dark mode on body */
   var element = document.body;
   element.classList.toggle("darkMode");
 };
