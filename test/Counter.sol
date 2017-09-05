pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Counter.sol";

contract TestCounter {
  function testInitialBalanceUsingDeployedContract() {
    Counter counter = Counter(DeployedAddresses.Counter());
    uint expected = 22;
    Assert.equal(counter.getValue(), expected, "Owner should have 1 Counter initially");
  }
}
