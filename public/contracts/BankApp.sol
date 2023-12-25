//THIS IS THE SMART CONTRACT DEPLOYED ON SEPOLIA TESTNET
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EthereumBank {

    address public bankOwner;
    mapping(address => uint) private userBalances;

    constructor() {
        bankOwner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == bankOwner);
        _;
    }

    function deposit() public payable returns (bool){
        require(msg.value > 0 ether);
        userBalances[msg.sender] += msg.value;
        return true;
    }

    function withdraw(uint _amount) public payable returns (bool){
        require(userBalances[msg.sender] >= _amount);
        payable(msg.sender).transfer(_amount);
        userBalances[msg.sender] -= _amount;
        return true;
    }

    function getBalance() public view returns (uint) {
        return userBalances[msg.sender];
    }

    function getContractBalance() public view onlyOwner returns (uint){
        return address(this).balance;
    }

    function withdrawFunds(uint _amount) public payable onlyOwner returns (bool){
        require(_amount > 0 ether);
        payable(bankOwner).transfer(_amount);
        return true;
    }

}