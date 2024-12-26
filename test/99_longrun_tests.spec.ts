import crypto from 'crypto'
import { ethers } from 'hardhat'
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'

import {
  deployFixture,
  signClaimRequest,
  executeInBatch,
  REWARDS_MANAGER_ROLE,
} from './helpers'

describe.skip('LongRun tests', () => {
  it('claims multiple rewards', async () => {
    const [owner] = await ethers.getSigners()
    const { aegisRewardsContract, aegisRewardsAddress, yusdContract } = await loadFixture(deployFixture)
    await yusdContract.setMinter(owner.address)

    await aegisRewardsContract.grantRole(REWARDS_MANAGER_ROLE, owner.address)

    const amount = ethers.parseEther('2')
    let ids: string[] = []
    let amounts: any[] = []
    let promises: any[] = []
    for (let i = 0; i < 870; i++) {
      const id = crypto.randomBytes(8).toString('hex')
      ids = [...ids, ethers.encodeBytes32String(id)]
      amounts = [...amounts, amount]
      promises = [
        ...promises,
        // yusdContract['mint(address,uint256,bytes)'](aegisRewardsAddress, amount, encodeString(id)),
        aegisRewardsContract.finalizeRewards(ethers.encodeBytes32String(id), 0),
      ]
    }

    await executeInBatch(...promises)

    const claimRequest = {
      claimer: owner.address,
      ids,
      amounts,
    }
    const signature = await signClaimRequest(claimRequest, aegisRewardsAddress)

    const tx = await aegisRewardsContract.claimRewards(claimRequest, signature)
    const receipt = await tx.wait()
    console.log(receipt)
    console.log(receipt?.fee)
    console.log(receipt?.gasUsed)
  })
})