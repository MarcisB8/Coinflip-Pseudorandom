const Coinflip = artifacts.require("Coinflip");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Coinflip).then(function(instance){
      instance.deposit({value: 1e18, from: accounts[0]}).then(function(){
          console.log("1 ETH deposited");
        }).catch(function(err){
          console.log(err);
        });
      console.log("Deployed successfully");
  }).catch(function(err){
    console.log("Deploy failed. " + err);
  });
};
