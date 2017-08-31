pragma solidity ^0.4.0;

contract Counter {
  uint _counter;

  function Counter () {
    _counter = 1;
  }

  function increment () {
    _counter = _counter + 1;
  }

  function getValue () returns (uint) {
    return _counter;
  }
}
