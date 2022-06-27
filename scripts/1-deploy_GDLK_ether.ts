import { ethers } from 'hardhat'
const adminaddress = '0xdBbC5151052c54AcAdBc2daEbf97199842D80c6c'
const swapAddress = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
const main = async () => {
  const GDLKFactory = await ethers.getContractFactory('GDLK')
  const gdlk = await GDLKFactory.deploy(adminaddress, adminaddress, [], swapAddress)
  await gdlk.deployed()

  console.log(gdlk.address)
  await gdlk.excludeFromFees(adminaddress, true)
  console.log('excludeFromFees')
  await gdlk.excludeFromMaxTx(adminaddress, true)
  console.log('excludeFromMaxTx')
  await gdlk.excludeFromMaxWallet(adminaddress, true)
  console.log('excludeFromMaxWallet')
  await gdlk.transferOwnership(adminaddress)
  console.log('transferOwnership')
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
// gdlk = await GDLKFactory.attach('0x765f11239Cfb3247F3fF78BbEe266fbD00a868da')
