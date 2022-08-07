import { task } from "hardhat/config"

task("block-number", "print the current block number").setAction(
  async (args, hre) => {
    // hre stands for hardhat runtime environment
    const blockNumber = await hre.ethers.provider.getBlockNumber()
    console.log(`Current block number is this: ${blockNumber}`)
  }
)
