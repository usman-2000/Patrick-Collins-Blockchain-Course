const { task } = require("hardhat/config")

task("block-number", "Prints the current block number").setAction(
    async (taskArg, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`The Current Block Number is : ${blockNumber}`)
    }
)

module.exports = {}
