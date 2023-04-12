// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;
contract task2{
    function id() public view returns (string memory){
        return "This is Vinay";
    }
    function get(int a,int b)public view returns (int){
        return a+b;
    }
}