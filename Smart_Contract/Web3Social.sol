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

    function addPost (string memory _postTxt, string memory _postImg) public payable {
        require(msg.value == (1 ether), "Please submit 1 ether");
        post storage newPost = Posts[counter];
        newPost.sender = msg.sender;
        newPost.id = counter;
        newPost.postTxt = _postTxt;
        newPost.postImg = _postImg;
        emit postCreated (msg.sender, counter, _postTxt, _postImg);
        counter++;

        payable(owner).transfer(msg.value);
    }

    function getPost(uint256 _postId) public view returns (string memory, string memory, address) {
        require(id < counter, "Post does not exist");
        post storage getPost = Posts[_postId];
        return (getPost.postTxt, getPost.postImg, getPost.sender);
    }
}