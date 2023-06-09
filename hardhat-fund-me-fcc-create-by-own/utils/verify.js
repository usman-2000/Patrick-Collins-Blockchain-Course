const { run } = require("hardhat");
const { modules } = require("web3");

const verify = async (contractAdress , args) =>{
    console.log("Verifying contract ....")
    try {
        await run("verify:verufy",{
            address:contractAdress,
            constructorArguments:args
        })
    } catch (error) {
        if(error.message.toLowerCase().includes("already verified")){
            console.log("Already Verified")
        }else{
            console.log(e)
        }
    }

}

module.exports = {verify}