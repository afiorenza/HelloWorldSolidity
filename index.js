const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');

const contractPath = `${__dirname}/contracts/Validator.sol`;
const from = '0xb0cebd927591798279f83c7c8916d2d53ba37129'

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8540'));

// Read with fs
const contract = fs.readFileSync(contractPath).toString();
// Compiles the contract
const compiledContract = solc.compile(contract);
// Get ABI definition. This is the interface of the contract.
const abiDefinition = JSON.parse(compiledContract.contracts[':MajorityList'].interface);
// Get instance
var contractInstance = new web3.eth.Contract(abiDefinition, '0x0000000000000000000000000000000000000005');

// Get validators
contractInstance.methods.getValidators().call({}, function (error, result) {
  if (error) console.log(`Error: ${error}`);
  console.log(`Result: ${result}`);
})
/*
// Add new validator
contractInstance.methods.addValidator(from)
  .send({from}, function (error, tx) {
    if (error) console.log(`Error: ${error}`);
    console.log(`Tx: ${tx}`);
  })
*/
