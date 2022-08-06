import { HardhatUserConfig } from "hardhat/config"
import dotenv from "dotenv"
import "@nomicfoundation/hardhat-toolbox"
import "@nomiclabs/hardhat-etherscan"

dotenv.config()

export const {
  GANACHE_RPC_URL,
  GANACH_ACCOUNT_PRIVATE_KEY = "",
  ETHERSCAN_API_KEY,
} = process.env

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  defaultNetwork: "hardhat",
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  networks: {
    ganache: {
      url: GANACHE_RPC_URL,
      accounts: [GANACH_ACCOUNT_PRIVATE_KEY],
      chainId: 1337,
    },
  },
}

export default config
