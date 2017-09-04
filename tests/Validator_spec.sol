pragma solidity ^0.4.0;

import "../dapp/ds-test/test.sol";

// A contract that can receive and transfer tokens.
// Useful for testing a system with multiple users.
contract TokenUser {
    AppToken  token;

    function TokenUser(AppToken token_) {
        token = token_;
    }

    function doTransfer(address to, uint amount)
        returns (bool)
    {
        return token.transfer(to, amount);
    }
}

contract AppTokenTest is DSTest {

    TokenUser user;
    AppToken token;

    // token and user will be instantiated before each test case
    function setUp() {
        token = new AppToken();
        user = new TokenUser(token);
    }

    function testTokenTransfer() {

        // inflate the supply of AppTokens
        token.mint(100);

        // test transfer to user
        assert(token.transfer(user, 100));

        // test transfer back
        assert(user.doTransfer(this, 100));
    }

    function testFailTokenTransfer() {

        // test transfering tokens with a balance of 0.
        // this should throw an exception, making this testcase correct.
        token.transfer(user, 10);
    }
}
