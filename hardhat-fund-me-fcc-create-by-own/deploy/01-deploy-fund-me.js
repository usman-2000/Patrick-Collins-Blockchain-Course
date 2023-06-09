// Normally we have
// import
// main
//calling of main function

// but in this we only have import

// module.exports = async (hre) => {
//   const { getNamedAccounts, deployments } = hre;
// };

const { network } = require("hardhat");
const {
  networkConfig,
  developmentChains,
} = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  // if chainid is X use address Y
  // if chainid is Y use adress Z

  // const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];

  let ethUsdPriceFeedAddress;
  if (developmentChains.includes(network.name)) {
    const ethUsdAggregator = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  } else {
    const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  }

  // If the contract doesn't exist, we deploy a minimal version for our local testing

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    //verify
  }

  //   well what happens when we want to change chains?
  // when going for local host or hardhat network we want to use mock

  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: [ethUsdPriceFeedAddress],
    log: true,
  });
  log("---------------------------------------------------------------------");
};

module.exports.tags = ["all", "fundme"];
