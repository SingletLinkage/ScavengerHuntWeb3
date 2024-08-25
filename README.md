# Scavenger Hunt dApp

## Overview

This is a decentralized application (dApp) built using Solidity and Web3.js. It features a simple scavenger hunt game where users can submit keys to earn progress. The contract validates the submitted keys and tracks user progress.

## Smart Contract

The smart contract is written in Solidity and deployed on an Ethereum-compatible network. It includes the following features:

- **Owner:** The address that deployed the contract.
- **User Progress:** A mapping that tracks the progress of each user based on the number of valid keys submitted.
- **Valid Keys:** A mapping that stores the hash of valid keys.

### Contract Code

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

contract ScavengerHunt {
    address public owner;
    mapping(address => uint) public userProgress;
    mapping(bytes32 => bool) private validKeys;

    constructor() {
        owner = msg.sender;
        // Add pre-defined valid keys
        validKeys[keccak256(abi.encodePacked("AlphaZero"))] = true;
    }

    function submitKey(bytes32 keyHash) public {
        require(validKeys[keyHash], "Invalid key!");
        userProgress[msg.sender] += 1;
    }
}
