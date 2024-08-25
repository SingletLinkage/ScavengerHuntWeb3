window.addEventListener('load', async () => {
    if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);

        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            const contractAddress = '0xcc7E1e34F702905D733d0509D4c37d833e6066b3';
            const abi = [
                {
                    "inputs": [],
                    "stateMutability": "nonpayable",
                    "type": "constructor"
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
                    "inputs": [
                        {
                            "internalType": "address",
                            "name": "",
                            "type": "address"
                        }
                    ],
                    "name": "userProgress",
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
        } catch (error) {
            document.getElementById('status').innerText = 'Error connecting to MetaMask!';
            console.error(error);
        }
    } else {
        document.getElementById('status').innerText = 'Please install MetaMask!';
    }
});
