window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);

        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            const contractAddress = '0xaff4e06c138d56cd6d0931a42f3cc4fdb7d7ebe3';
            const abi = [
                {
                    "inputs": [
                        {
                            "internalType": "bytes32",
                            "name": "keyHash",
                            "type": "bytes32"
                        }
                    ],
                    "name": "submitKey",
                    "outputs": [],
                    "stateMutability": "nonpayable",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "user",
                            "type": "address"
                        }
                    ],
                    "name": "getUserProgress",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "bytes32",
                            "name": "keyHash",
                            "type": "bytes32"
                        }
                    ],
                    "name": "isValidKey",
                    "outputs": [
                        {
                            "internalType": "bool",
                            "name": "",
                            "type": "bool"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [],
                    "name": "owner",
                    "outputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                },
                {
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "name": "userUniqueKeyCount",
                    "outputs": [
                        {
                            "internalType": "uint256",
                            "name": "",
                            "type": "uint256"
                        }
                    ],
                    "stateMutability": "view",
                    "type": "function"
                }
            ];
            
            const contract = new web3.eth.Contract(abi, contractAddress);
            document.getElementById('submitKey').addEventListener('click', async () => {
                const key = document.getElementById('keyInput').value;
                const keyHash = web3.utils.keccak256(key);

                const accounts = await web3.eth.getAccounts();
                const account = accounts[0];

                try {
                    const isValid = await contract.methods.isValidKey(keyHash).call();
                    console.log("Is Valid:", isValid);

                    if (isValid) {
                        await contract.methods.submitKey(keyHash).send({ from: account });
                        document.getElementById('status').innerText = 'Key submitted successfully!';
                    } else {
                        document.getElementById('status').innerText = 'Invalid key!';
                    }
                } catch (error) {
                    document.getElementById('status').innerText = 'Error submitting key!';
                    console.error(error);
                }
            });

            document.getElementById('checkProgress').addEventListener('click', async () => {
                const accounts = await web3.eth.getAccounts();
                const account = accounts[0];

                try {
                    const progress = await contract.methods.getUserProgress(account).call();
                    if (progress >= 5) {
                        document.getElementById('progressStatus').innerText = 'Congrats, you have successfully completed the game!';
                    } else {
                        document.getElementById('progressStatus').innerText = `Your progress: ${progress}`;
                    }
                } catch (error) {
                    document.getElementById('progressStatus').innerText = 'Error retrieving progress!';
                    console.error(error);
                }
            });

        } catch (error) {
            document.getElementById('status').innerText = 'Error connecting to MetaMask!';
            console.error(error);
        }
    } else {
        document.getElementById('status').innerText = 'Please install MetaMask!';
    }
});
