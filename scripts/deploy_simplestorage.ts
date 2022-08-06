// we are not going to be importing
// ethers from ethers anymore
// importing ethers from hardhat
// makes it easier for us to use and
// interact with our contracts
import { ethers } from "hardhat";

async function main() {
  // hardhat already know that we have
  // simplestorage as our contract
  // we have also generated typescript types
  // which means we will have the ABIs in our
  // intellisense.
  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");

  // to deploy a contract we needed two things
  // - RPC URL
  // - ABIs
  // when we deploy contracts using hardhat we don't need it
  // as hardhat comes with builtin default network
  // configuration. This is very similar to Ganache.
  // hence when we run the deploy script our
  // contracv will be deployed.
  const simpleStorage = await SimpleStorage.deploy();

  await simpleStorage.deployed();

  await simpleStorage.store("8")
  const number = await simpleStorage.retrieve();
  console.log("Number stored is:", number.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
