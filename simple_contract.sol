// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract SimpleContract {
    address private _owner;

    constructor () {
        _owner = msg.sender;
    }

    function setOwner(address newAddr) public {
        require(msg.sender == _owner);
        _owner = newAddr;
    }
}
