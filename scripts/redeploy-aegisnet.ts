import { ethers } from 'hardhat'

async function main() {
  const [deployer] = await ethers.getSigners()

  // const signerAddress = '0x136acf81D40C817bA08321732219d592Bd377329'
  const custodianAddress = '0x9B897dC0B6B19681E1fE6d8ce92e1BC647D7Ba0b'
  const usdtAddress = '0x4CE6563330166122DBe372Ad7ec175b7783a0FC0'
  const usdcAddress = '0x03201Dcb4af8Bca7c73a06C32031482Ecdcc2833'
  const daiAddress = '0x0DA7C7E1b61c767d379373B4dda9Ff5734f5cf1b'
  const usdaAddress = '0x62Bd0Eb66F9b8c5cBbd72DC942DDC78FAabEb86F'
  const aegisConfigAddress = ''
  const aegisRewardsAddress = '0xE6565F236E352D18f48F3c80e222333Dc024373e'
  const aegisOracleAddress = ''
  const feedRegistryAddress = ''

  const aegisMintingContract = await ethers.deployContract('AegisMinting', [
    usdaAddress,
    aegisConfigAddress,
    aegisRewardsAddress,
    aegisOracleAddress,
    feedRegistryAddress,
    ethers.ZeroAddress,
    [
      usdtAddress,
      usdcAddress,
      daiAddress,
    ],
    [
      custodianAddress,
    ],
    deployer.address,
  ])
  await aegisMintingContract.deploymentTransaction()?.wait()
  const aegisMintingAddress = await aegisMintingContract.getAddress()
  console.log('AegisMinting address', aegisMintingAddress)

  {
    const usdaContract = await ethers.getContractAt('USDa', usdaAddress)
    const tx = await usdaContract.setMinter(aegisMintingAddress)
    await tx.wait()
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
