import { ethers } from 'hardhat'

async function main() {
  const [deployer] = await ethers.getSigners()

  const signerAddress = '0x136acf81D40C817bA08321732219d592Bd377329'
  const custodianAddress = '0x9B897dC0B6B19681E1fE6d8ce92e1BC647D7Ba0b'

  const usdtContract = await ethers.deployContract('TestToken', ['Tether USDT', 'USDT', 6])
  await usdtContract.deploymentTransaction()?.wait()
  const usdtAddress = await usdtContract.getAddress()
  console.log('USDT address', usdtAddress)

  const usdcContract = await ethers.deployContract('TestToken', ['USD Coin', 'USDC', 6])
  await usdcContract.deploymentTransaction()?.wait()
  const usdcAddress = await usdcContract.getAddress()
  console.log('USDC address', usdcAddress)

  const daiContract = await ethers.deployContract('TestToken', ['Dai Stablecoin', 'DAI', 18])
  await daiContract.deploymentTransaction()?.wait()
  const daiAddress = await daiContract.getAddress()
  console.log('DAI address', daiAddress)

  const usdaContract = await ethers.deployContract('USDa', [deployer.address])
  await usdaContract.deploymentTransaction()?.wait()
  const usdaAddress = await usdaContract.getAddress()
  console.log('USDa address', usdaAddress)

  const feedRegistryContract = await ethers.deployContract('FeedRegistry')
  await feedRegistryContract.deploymentTransaction()?.wait()
  const feedRegistryAddress = await feedRegistryContract.getAddress()
  console.log('FeedRegistry address', feedRegistryAddress)

  const aegisConfigContract = await ethers.deployContract('AegisConfig', [
    signerAddress,
    [deployer.address],
    deployer.address,
  ])
  await aegisConfigContract.deploymentTransaction()?.wait()
  const aegisConfigAddress = await aegisConfigContract.getAddress()
  console.log('AegisConfig address', aegisConfigAddress)

  const aegisOracleConract = await ethers.deployContract('AegisOracle', [
    [deployer.address],
    deployer.address,
  ])
  await aegisOracleConract.deploymentTransaction()?.wait()
  const aegisOracleAddress = await aegisOracleConract.getAddress()
  console.log('AegisOracle address', aegisOracleAddress)

  const aegisRewardsContract = await ethers.deployContract('AegisRewards', [
    usdaAddress,
    aegisConfigAddress,
    deployer.address,
  ])
  await aegisRewardsContract.deploymentTransaction()?.wait()
  const aegisRewardsAddress = await aegisRewardsContract.getAddress()
  console.log('AegisRewards address', aegisRewardsAddress)

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
      86400,
      86400,
      3600,
    ],
    [
      custodianAddress,
    ],
    deployer.address,
  ])
  await aegisMintingContract.deploymentTransaction()?.wait()
  const aegisMintingAddress = await aegisMintingContract.getAddress()
  console.log('AegisMinting address', aegisMintingAddress)

  const wethContract = await ethers.deployContract('WETH9')
  await wethContract.deploymentTransaction()?.wait()
  const wethAddress = await wethContract.getAddress()
  console.log('WETH address', wethAddress)

  {
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
