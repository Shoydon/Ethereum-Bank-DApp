var contractABI = [
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
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
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdrawFunds",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "bankOwner",
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
		"inputs": [],
		"name": "getBalance",
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
		"inputs": [],
		"name": "getContractBalance",
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

var contractAddress = "0xe1cF6d7343e9660c77b02aF664135c94d8fa67D6";

var address;

var userAddress = document.getElementById('account-address');
var depositAmount = document.getElementById('deposit-ether');
var withdrawAmount = document.getElementById('withdraw-ether');
var balance = document.getElementById('account-balance');

async function ConnectMetamask() {
	var accounts = await ethereum.request({method: 'eth_requestAccounts'});
	address = accounts[0];
	console.log("Account 1: " + address);
	userAddress.innerText = "Connected Account address: " + address;
}

async function DepositEther(){
	console.log(depositAmount.value);
	contract.methods.deposit().send({from: address, value: depositAmount.value}, function(err, res){
		console.log("Transaction hash: "+res);
	})
}

async function WithdrawEther(){
	console.log(withdrawAmount.value);
	contract.methods.withdraw(withdrawAmount.value).send({from: address}, function(err, res){
		console.log("Transaction hash: "+res);
	})
}

async function GetBalance(){
	contract.methods.getBalance().call({from: address}, function(err, res){
		balance.innerText = "Balance: " + res + " wei"
		console.log("Balance: " + res + " wei");
	})
}

document.addEventListener('DOMContentLoaded', async () => {
	if(typeof window.ethereum !== 'undefined'){
		console.log("MetaMask is installed!");
		
        web3 = new Web3(window.ethereum);
        console.log("web3 is loaded", web3);
		
        contract = new web3.eth.Contract(contractABI, contractAddress);
        console.log("contract is loaded", contract);

		if (window.ethereum.isConnected()) {
			console.log("MetaMask is connected");
			var accounts = await ethereum.request({method: 'eth_requestAccounts'});
			address = accounts[0];
			userAddress.innerText = "Connected Account address: " + address;
		  }
		
		ethereum.on('accountsChanged', async function (accounts){
			var accounts = await ethereum.request({method: 'eth_requestAccounts'});
			address = accounts[0];
			userAddress.innerText = "Connected Account address: " + address;
		});
		
    } else {
        alert('Please install Metamask')
    }


})