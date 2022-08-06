// we are not going to be importing
// ethers from ethers anymore
// importing ethers from hardhat
// makes it easier for us to use and
// interact with our contracts
import { ethers, run, network } from "hardhat"
import { ETHERSCAN_API_KEY } from "../hardhat.config"

async function verifyContract(address: string, args: any[]) {
  try {
    // we can verify contracts using hardhat cli.
    // but we can also interact with that cli in our code.
    // to call verify cli from hardat we imported verify.
    // we can then run several tasks that hardhat verify cli provides.
    // in this case we will just run verify.
    await run("verify:verify", {
      address,
      constructorArguments: args,
    })
  } catch (error: any) {
    if (error.message.includes("Already Verified")) {
      console.log("Already Verfied")
      return
    }
    console.log(error)
  }
}

async function main() {
  // hardhat already know that we have
  // simplestorage as our contract
  // we have also generated typescript types
  // which means we will have the ABIs in our
  // intellisense.
  const SimpleStorage = await ethers.getContractFactory("SimpleStorage")

  // to deploy a contract we needed two things
  // - RPC URL
  // - ABIs
  // when we deploy contracts using hardhat we don't need it
  // as hardhat comes with builtin default network
  // configuration. This is very similar to Ganache.
  // hence when we run the deploy script our
  // contracv will be deployed.
  const simpleStorage = await SimpleStorage.deploy()

  await simpleStorage.deployed()

  // programatic verification of contracts
  // we cannot verify contracts on hardhat or ganache
  // therefore we need to make sure that we are on
  // mainnet or testnet. To check this we can use
  // network chainId. To get this we can network from hardhat.
  // rinkby testnet chainid is 4.
  // we also need to make sure that we have etherscan api key.
  if (network.config.chainId === 4 && ETHERSCAN_API_KEY) {
    // we can now verify our contract. but before we do that
    // we need to make sure that etherscan knows that our contract is
    // deployed and is available to verify.
    // for that we need to wait.
    await simpleStorage.deployTransaction.wait(6) // we can wait few blocks to be mined, in this case 6.
    await verifyContract(simpleStorage.address, [])
  }
  await simpleStorage.store("8")
  const number = await simpleStorage.retrieve()
  console.log("Number stored is:", number.toString())
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
