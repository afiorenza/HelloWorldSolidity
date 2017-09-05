const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');

function deployAndGet (name, cb) {
  const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  const contractPath = `${__dirname}/../../contracts/${name}.sol`;

  web3.eth.getAccounts().then(function (accounts) {
    const from = accounts[0];
    const contract = fs.readFileSync(contractPath).toString();
    const compiledContract = solc.compile(contract);
    const abiDefinition = JSON.parse(compiledContract.contracts[`:${name}`].interface);
    const byteCode = compiledContract.contracts[`:${name}`].bytecode;
    const Contract = new web3.eth.Contract(abiDefinition);

    Contract.deploy({data: byteCode, arguments: []}).estimateGas({from}).then(function (gas, err) {

      Contract.deploy({data: byteCode, arguments: []}).send({from, gas: gas + 21000})
        .on('error', function () {
          cb(null, from, 'Deploy error');
        })
        .then(function (instance) {
          cb(instance, from, null);
        })
    })


  })
}

module.exports = deployAndGet;
