//SPDX-License-Identifier:MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract Bep20Token is ERC20 {
    constructor() ERC20("Test", "tst") {}

    function mint(address account, uint256 amount) public {
        _mint(account, amount);
    }
}
