// imports
const { ethers, run, network } = require("hardhat")

// async main
async function main() {
    const simpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorageContract"
    )
    console.log("Deploying Please wait naa.....")
    const simpleStorage = await simpleStorageFactory.deploy()
    await simpleStorage.deployed()
    console.log(`Deployed contract at: ${simpleStorage.address}`)
    // what happened when we deploy our script to hardhat network??

    // console.log(network.config)
    // we programmatically called the verify function
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for the block txes....")
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    // interacting with contract

    const currentValue = await simpleStorage.retrieve()
    console.log(`Current value of the Favourite Number is : ${currentValue}`)

    // update the current value
    const transactionResponse = await simpleStorage.store(9)
    await transactionResponse.wait(1)
    const updateCurrentValue = await simpleStorage.retrieve()
    console.log(`Updated Value is : ${updateCurrentValue}`)
}

async function verify(contractAddress, args) {
    console.log("Verifying contract ...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Alrady Verified")
        } else {
            console.log(error)
        }
    }
}

// main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
