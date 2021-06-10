const ABI = [
            	{
            		"inputs": [],
            		"stateMutability": "nonpayable",
            		"type": "constructor"
            	},
            	{
            		"inputs": [],
            		"name": "_winner",
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
            				"name": "newAddr",
            				"type": "address"
            			}
            		],
            		"name": "setWinner",
            		"outputs": [],
            		"stateMutability": "nonpayable",
            		"type": "function"
            	}
            ];

module.exports = ABI;