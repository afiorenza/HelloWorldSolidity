const assert = require('assert');
const deployAndGet = require('./helper/deployAndGet');

let contractInstance;
let contractName = 'Counter';
let from;


before(function(done) {
  this.timeout(10000);

  deployAndGet(contractName, function (instance, address, error) {
    if (error) done();
    contractInstance = instance;
    from = address;
    done();
  })
});

describe(contractName, function () {

  describe('getValue', function () {

    it('should return initial value', function () {
      return contractInstance.methods.getValue().call(function (error, result) {
        assert.equal(result, 1);
      });
    });
  });

  describe('increment', function () {

    it('should increment one unit', function () {
      this.timeout(10000);

      return contractInstance.methods.increment().send({from}, function () {
        contractInstance.methods.getValue().call(function (error, result) {
          assert.equal(result, 2);
        });
      });
    });
  });
});
