import { ethers } from 'hardhat'

async function main() {
  // const usdtContract = await ethers.getContractAt('TestToken', '0x4CE6563330166122DBe372Ad7ec175b7783a0FC0')
  // const usdcContract = await ethers.getContractAt('TestToken', '0x03201Dcb4af8Bca7c73a06C32031482Ecdcc2833')
  // const daiContract = await ethers.getContractAt('TestToken', '0x0DA7C7E1b61c767d379373B4dda9Ff5734f5cf1b')
  // const usdaContract = await ethers.getContractAt('USDa', '0x62Bd0Eb66F9b8c5cBbd72DC942DDC78FAabEb86F')

  // await usdtContract.approve('0xE1e9b0ad8590dedF43f6CEF94A618fB167196C8c', ethers.MaxUint256).then(tx => tx.wait())
  // await usdcContract.approve('0xE1e9b0ad8590dedF43f6CEF94A618fB167196C8c', ethers.MaxUint256).then(tx => tx.wait())
  // await daiContract.approve('0xE1e9b0ad8590dedF43f6CEF94A618fB167196C8c', ethers.MaxUint256).then(tx => tx.wait())
  // await usdaContract.approve('0xE1e9b0ad8590dedF43f6CEF94A618fB167196C8c', ethers.MaxUint256).then(tx => tx.wait())

  // Local
  const usdtContract = await ethers.getContractAt('TestToken', '0x2E0496348836600BBa4616bD94fA5d22725e024C')
  const usdcContract = await ethers.getContractAt('TestToken', '0xc3520fF1142d4688e4d1aAA49e5D54589246E5e3')
  const daiContract = await ethers.getContractAt('TestToken', '0xDd95Ac8a33940AEE9BfDBdD9903A3B0d232366BD')
  const usdaContract = await ethers.getContractAt('USDa', '0x6B94B0c3305bcEf95E106Bd4D506936744c108eb')

  await usdtContract.approve('0x5157329f6A7E48b21dAfE29e8C2e75b8162b79B0', ethers.MaxUint256).then(tx => tx.wait())
  await usdcContract.approve('0x5157329f6A7E48b21dAfE29e8C2e75b8162b79B0', ethers.MaxUint256).then(tx => tx.wait())
  await daiContract.approve('0x5157329f6A7E48b21dAfE29e8C2e75b8162b79B0', ethers.MaxUint256).then(tx => tx.wait())
  await usdaContract.approve('0x5157329f6A7E48b21dAfE29e8C2e75b8162b79B0', ethers.MaxUint256).then(tx => tx.wait())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
