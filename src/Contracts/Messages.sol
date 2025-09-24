// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract Message {
    mapping(address => string) public messages;

    function createMessage(string memory _message) public {
        messages[msg.sender] = _message;
    }

    function getMessage(address _owner) public view returns (string memory) {
        return messages[_owner];
    }
}