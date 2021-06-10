// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

contract SimpleContract {
    address private _owner;
    address public _winner;

    constructor () {
        _owner = msg.sender;
    }

    function setWinner(address newAddr) public {
        require(msg.sender == _owner);
        _winner = newAddr;
    }
}
