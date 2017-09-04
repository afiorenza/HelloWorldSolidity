pragma solidity ^0.4.16;

import "ds-test/test.sol";

import "./Helloworldsolidity.sol";

contract HelloworldsolidityTest is DSTest {
    Helloworldsolidity helloworldsolidity;

    function setUp() {
        helloworldsolidity = new Helloworldsolidity();
    }

    function testFail_basic_sanity() {
        assertTrue(false);
    }

    function test_basic_sanity() {
        assertTrue(true);
    }
}
