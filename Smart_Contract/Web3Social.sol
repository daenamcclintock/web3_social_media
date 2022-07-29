// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract web3Social {
    address public owner;
    uint256 private counter;

    constructor() {
        counter = 0;
        owner = msg.sender
    }

    struct post {
        address sender;
        uint256 id;
        string postTxt;
        string postImg;
    }

    event postCreated (address sender, uint256 id, string postTxt, string postImg);

    mapping(uint256 => post) Posts;
}