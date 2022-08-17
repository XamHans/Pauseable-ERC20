//SPDX-License-Identifier: Unlicense
//specific solidity cersion
pragma solidity ^0.8.7;
import "hardhat/console.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title a pausable erc20 contract
/// @custom:desc the idea with pausable is, that the deployer of the contract can stop/allow transfers of token
/// +++ useful in terms of a bug or an attack
/// --- disadvantage of course is again one entity as an centralised unit that controls transactions
/// @author Johannes Müller
/// @notice This is just for learning purposes, dont use it on mainnet
/// @dev All functions are tested with associated unit test

contract FreezeContract is ERC20, Pausable, Ownable {

    constructor(uint256 initialSupply) public ERC20("FreezeToken", "FT") {
        _mint(msg.sender, initialSupply);
    }

    ///  @dev where are using the parent (PlausibleContracat by OZ) _pause function
    ///  @dev that can only be called by the deployer (onlyOwner modifier is checking this)
    function pause() public onlyOwner {
        _pause();
    }

    ///  @dev where are using the parent (PlausibleContracat by OZ) _unpause function
    ///  @dev that can only be called by the deployer (onlyOwner modifier is checking this)

    function unpause() public onlyOwner {
        _unpause();
    }

    /// @dev beforeTokenTransfer is a hook fn thats executed before transaction is made, here we check with the modifier
    /// whenNotPaused if the transaction can be executed
    /// otherwise call parents (ERC20) _beforeTokenTransfer implementation
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }
}
