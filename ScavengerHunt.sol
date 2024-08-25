// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

contract ScavengerHunt {
    address public owner;
    mapping(address => mapping(bytes32 => bool)) private userSubmittedKeys; // Track submitted keys per user
    mapping(address => uint) public userProgress;
    mapping(bytes32 => bool) private validKeys;

    // Define a fixed-size array to store the valid key hashes
    bytes32[] private allValidKeys;

    constructor() {
        owner = msg.sender;
        // Add pre-defined valid keys
        bytes32 key1 = keccak256(abi.encodePacked("Key1"));
        bytes32 key2 = keccak256(abi.encodePacked("Key2"));
        bytes32 key3 = keccak256(abi.encodePacked("Key3"));
        bytes32 key4 = keccak256(abi.encodePacked("Key4"));
        bytes32 key5 = keccak256(abi.encodePacked("Key5"));

        validKeys[key1] = true;
        validKeys[key2] = true;
        validKeys[key3] = true;
        validKeys[key4] = true;
        validKeys[key5] = true;

        // Initialize the fixed-size array
        allValidKeys.push(key1);
        allValidKeys.push(key2);
        allValidKeys.push(key3);
        allValidKeys.push(key4);
        allValidKeys.push(key5);
    }

    function submitKey(bytes32 keyHash) public {
        require(validKeys[keyHash], "Invalid key!");
        require(!userSubmittedKeys[msg.sender][keyHash], "Key already submitted!");

        userSubmittedKeys[msg.sender][keyHash] = true;
        userProgress[msg.sender] = countUniqueKeys(msg.sender);
    }

    function countUniqueKeys(address user) internal view returns (uint) {
        uint count = 0;
        for (uint i = 0; i < allValidKeys.length; i++) {
            if (userSubmittedKeys[user][allValidKeys[i]]) {
                count += 1;
            }
        }
        return count;
    }

    function isValidKey(bytes32 keyHash) public view returns (bool) {
        return validKeys[keyHash];
    }

    function getUserProgress(address user) public view returns (uint) {
        return userProgress[user];
    }
}
