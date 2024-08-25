# Scavenger Hunt dApp

## Overview

This is a decentralized application (dApp) built using Solidity and Web3.js. It features a simple scavenger hunt game where users can submit keys to earn progress. The contract validates the submitted keys and tracks user progress.

## Smart Contract

The smart contract is written in Solidity and deployed on an Ethereum-compatible network. It includes the following features:

- **Owner:** The address that deployed the contract.
- **User Progress:** A mapping that tracks the progress of each user based on the number of valid keys submitted.
- **Valid Keys:** A mapping that stores the hash of valid keys.

## Frontend

The frontend is built using HTML and JavaScript, specifically Web3.js, to interact with the Ethereum smart contract. It allows users to submit keys and check if they are valid.

## Installation

### Clone the Repository:

```bash
git clone <repository-url>
cd <repository-folder>
```

### Install Dependencies:

Ensure you have Web3.js included in your HTML file. You can use the CDN link or install it via npm if you're using a bundler like Webpack.

### Setup MetaMask:

Make sure you have MetaMask installed in your browser and connected to the Ethereum network where the contract is deployed.

## Usage

    - Open index.html in Your Browser:

    - The frontend is designed to be opened directly in a web browser. Make sure MetaMask is connected to the correct network.

    - Submit a Key:
        Enter the key in the input field.
        Click the "Submit Key" button.
        You will see the status message indicating whether the key was submitted successfully or if there was an error.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
## Acknowledgments

- Solidity
- Web3.js
- MetaMask
