import { ethers } from 'hardhat'
const adminaddress = '0xdBbC5151052c54AcAdBc2daEbf97199842D80c6c'
const swapAddress = '0x60aE616a2155Ee3d9A68541Ba4544862310933d4'
const main = async () => {
  const GDLKFactory = await ethers.getContractFactory('GDLK_AVAX')
  const gdlk = await GDLKFactory.deploy(adminaddress, adminaddress, [], swapAddress)
  // await gdlk.deployed()
  // const [_] = await ethers.getSigners()
  // const oldBalance = await ethers.provider.getBalance(_.address)
  console.log(gdlk.address)
  // await gdlk.excludeFromFees(adminaddress, true)
  // console.log('excludeFromFees')
  // await gdlk.excludeFromMaxTx(adminaddress, true)
  // console.log('excludeFromMaxTx')
  // await gdlk.excludeFromMaxWallet(adminaddress, true)
  // console.log('excludeFromMaxWallet')
  // await gdlk.transferOwnership(adminaddress)
  // console.log('transferOwnership')
  // const newBalance = await ethers.provider.getBalance(_.address)
  // console.log({
  //   NativeUsed: ethers.utils.formatEther(oldBalance.sub(newBalance))
  // })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
// gdlk = await GDLKFactory.attach('0x8E30951123132840647D881D166723d64e5FB88B')
