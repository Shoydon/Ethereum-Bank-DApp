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

// The contractABI and contractAddress variables reference to the contract which I have deployed. You can edit these variables and change them to your contract address and ABI after deploying your own contract or else you can work with mine  

var address;

var userAddress = document.getElementById('account-address');
var depositAmount = document.getElementById('deposit-ether');
var withdrawAmount = document.getElementById('withdraw-ether');
var balance = document.getElementById('account-balance');

// ADMIN PART OF THE CODE START
var withdrawFundsAmount = document.getElementById('withdraw-funds');
var contractBalance = document.getElementById('contract-balance');
//ADMIN PART OF CODE END

async function ConnectMetamask() {
	if(typeof window.ethereum !== 'undefined'){
		if(window.ethereum.isConnected()){
			var accounts = await ethereum.request({method: 'eth_requestAccounts'});
			address = accounts[0];
			console.log("Account 1: " + address);
			userAddress.innerText = "Connected Account address: " + address;
		}
	} else {
		alert("Please install Metamask")
	}
}

async function DepositEther(){
	if (depositAmount.value <= 0 || depositAmount.value == undefined) {
		alert("Amount cannot be zero or less")
	} else {
		try {
			console.log("Deposit Amount: " + depositAmount.value);
			await contract.methods.deposit().send({from: address, value: depositAmount.value}, function(err, res){
				console.log("Transaction hash: "+res);
			})
		} catch (e) {
			alert("An error occured, check if you have metamask installed and connected your wallet");
			console.log(e);
		}
	}
}

async function WithdrawEther(){
	if (withdrawAmount.value <= 0 || withdrawAmount.value == undefined) {
		alert("Amount cannot be zero or less")
	} else {
		try {
			console.log("Withdraw Amount: " + withdrawAmount.value);
			await contract.methods.withdraw(withdrawAmount.value).send({from: address}, function(err, res){
				console.log("Transaction hash: "+res);
			})
		} catch (e) {
			alert("An error occured, check if you have metamask installed and connected your wallet");
			console.log(e);
		}
	}
}

async function GetBalance(){
	try {
		await contract.methods.getBalance().call({from: address}, function(err, res){
			balance.innerText = "Balance: " + res + " wei"
			console.log("Balance: " + res + " wei");
		})
	} catch (e) {
		alert("An error occured, check if you have metamask installed and connected your wallet");
		console.log(e);
	}
}

// ADMIN PART OF THE CODE START
async function AdminDashboard(){
	try{
		const bankOwner = await contract.methods.bankOwner().call();
		if(address.toLowerCase() === bankOwner.toLowerCase()){
			window.location.href = '/admin';
		} else {
			window.location.href = '';
			alert("You are not the Bank Owner");
		}
	} catch(err){
		console.log(err);
	}
}

async function GetContractBalance(){
	try {
		var accounts = await ethereum.request({method: 'eth_requestAccounts'});
		address = accounts[0];
		console.log(address);
		await contract.methods.getContractBalance().call({from:address}, function(err, res){
			contractBalance.innerText = "Contract Balance: " + res + " wei"
			console.log("Contract Balance: " + res + " wei");
		})
	} catch (e) {
		alert("An error occured, check if you have metamask installed and connected your wallet");
		console.log(e);
	}
}

async function WithdrawFunds(){
	if (withdrawFundsAmount.value <= 0 || withdrawFundsAmount.value == undefined) {
		alert("Amount cannot be zero or less")
	} else {
		try {
			var accounts = await ethereum.request({method: 'eth_requestAccounts'});
			address = accounts[0];
			console.log(address);
			console.log("Withdraw Amount: " + withdrawFundsAmount.value);
			await contract.methods.withdrawFunds(withdrawFundsAmount.value).send({from: address}, function(err, res){
				console.log("Transaction hash: "+res);
			})
		} catch (e) {
			alert("An error occured, check if you have metamask installed and connected your wallet");
			console.log(e);
		}
	}
}
//ADMIN PART OF CODE END

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