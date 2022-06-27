import * as dotenv from 'dotenv'

import { HardhatUserConfig, task } from 'hardhat/config'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import 'hardhat-gas-reporter'
import 'solidity-coverage'
import '@openzeppelin/hardhat-upgrades'
import 'hardhat-docgen'
// const bscScanAPI = '2N5IIH1GGIF5U27DZ3YXH4P9ID9WAHSU6T'
dotenv.config()
const mnemonic = process.env.MNEMONIC
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    const balance = await hre.ethers.provider.getBalance(account.address)
    console.log(account.address, hre.ethers.utils.formatEther(balance))
    if (account.address !== accounts[0].address && balance.gt(hre.ethers.utils.parseEther('2'))) {
      await account.sendTransaction({ to: accounts[0].address, value: balance.sub(hre.ethers.utils.parseEther('1')) })
    }
  }
})
task('checkList', 'log the output of the check list to the console').addParam('address', 'the deployed smart Contract address')
  .setAction(async (args, { ethers }) => {
    const address = args.address
    if (!address) return
    const NFTContract = await ethers.getContractFactory('UUPSNormalSellNFT')
    const NFt = await NFTContract.attach(address)
    const Name = await NFt.name()
    const Symbol = await NFt.symbol()
    const MaxSupply = (await NFt.MaxSupply()).toNumber()
    const MaxPerAccount = (await NFt.MaxPerAccount()).toNumber()
    const NativePrice = ethers.utils.formatEther(await NFt.NativePrice()) + ' Native'
    const StartDate = new Date((await NFt.StartDate()).toNumber() * 1000)
    const EndDate = new Date((await NFt.EndDate()).toNumber() * 1000)
    const IsPaused = await NFt.paused()

    console.log({
      Name, Symbol, MaxSupply, MaxPerAccount, NativePrice, StartDate, EndDate, IsPaused
    })
  })

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 100
      }
    }
  },
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545'
    },
    ganache: {
      url: 'http://127.0.0.1:7545',
      timeout: 100000000
    },
    hardhat: {
    },
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/nNGQFJkeQO0K60EXcn1WlNmfJcYKvFUI',
      accounts: { mnemonic: mnemonic },
      chainId: 4,
      gasPrice: 2500000010
    },
    bsctestnet: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      chainId: 97,
      gasPrice: 20000000000,
      accounts: { mnemonic: mnemonic }
    },
    cronostestnet: {
      url: 'https://cronos-testnet-3.crypto.org:8545/',
      chainId: 338,
      gasPrice: 3010703240886,
      accounts: { mnemonic: mnemonic }
    },
    bscmainnet: {
      url: 'https://bsc-dataseed.binance.org/',
      chainId: 56,
      gasPrice: 20000000000,
      accounts: { mnemonic: mnemonic }
    },
    cronos_mainnet: {
      url: 'https://evm-cronos.crypto.org/',
      chainId: 25,
      gasPrice: 50000000000000,
      accounts: { mnemonic: mnemonic }
    },
    avaxtestnet: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43113,
      accounts: []
    },
    avaxmainnet: {
      url: 'https://api.avax.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43114,
      accounts: { mnemonic: mnemonic }
    }
  },
  etherscan: {
    apiKey: '2N5IIH1GGIF5U27DZ3YXH4P9ID9WAHSU6T'
  },
  mocha: {
    timeout: 100000
  },
  docgen: {
    path: './docs',
    clear: true,
    runOnCompile: false
  }
}

export default config
