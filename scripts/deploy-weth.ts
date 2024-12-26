import { ethers } from 'hardhat'

async function main() {
  const wethContract = await ethers.deployContract('WETH9')
  await wethContract.deploymentTransaction()?.wait()
  const wethAddress = await wethContract.getAddress()
  console.log('WETH address', wethAddress)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
