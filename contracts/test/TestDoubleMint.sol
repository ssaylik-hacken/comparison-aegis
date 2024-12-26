// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import { IYUSD, IYUSDErrors } from "../interfaces/IYUSD.sol";

contract TestDoubleMint {
  IYUSD public yusd;

  constructor(IYUSD _yusd) {
    yusd = _yusd;
  }

  function doubleMint(address to, uint256 amount) external {
    yusd.mint(to, amount, "test");
    yusd.mint(to, amount, "test");
  }
}
