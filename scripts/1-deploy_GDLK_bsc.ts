import { ethers } from 'hardhat'
const adminaddress = '0xdBbC5151052c54AcAdBc2daEbf97199842D80c6c'
// const swapAddress = '0xdc4904b5f716Ff30d8495e35dC99c109bb5eCf81'
const swapAddress = '0x10ED43C718714eb63d5aA57B78B54704E256024E'
const main = async () => {
  const GDLKFactory = await ethers.getContractFactory('GDLK')
  const gdlk = await GDLKFactory.deploy(adminaddress, adminaddress, [], swapAddress)
  console.log(gdlk.address)
  await gdlk.deployed()
  const [_] = await ethers.getSigners()
  const oldBalance = await ethers.provider.getBalance(_.address)

  await gdlk.connect(_).excludeFromFees(adminaddress, true)
  console.log('excludeFromFees')
  await gdlk.connect(_).excludeFromMaxTx(adminaddress, true)
  console.log('excludeFromMaxTx')
  await gdlk.connect(_).excludeFromMaxWallet(adminaddress, true)
  console.log('excludeFromMaxWallet')
  await gdlk.connect(_).transferOwnership(adminaddress)
  console.log('transferOwnership')
  const newBalance = await ethers.provider.getBalance(_.address)
  console.log({
    NativeUsed: ethers.utils.formatEther(oldBalance.sub(newBalance))
  })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
// gdlk = await GDLKFactory.attach('0xc3B3f5A1F7f3C7e4214B6EeF935c4A3Cd4C73153')
