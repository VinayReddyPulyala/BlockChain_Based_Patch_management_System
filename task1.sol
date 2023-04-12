// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;
contract smplcode{
    string public s="hello World-This is Vinay";
    function get() public view returns(string memory){
        return s;
    }
}