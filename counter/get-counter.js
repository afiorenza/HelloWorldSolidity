const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');
const argv = require('yargs').argv;

const contractPath = `${__dirname}/../contracts/Counter.sol`;
const address = '0xa3665e5EEaE3805Ac4cbA62BE01Eba54dc80442E';

// Connects to blockchain
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
// Read contract from file system
const contract = fs.readFileSync(contractPath).toString();
// Compiles the contract
const compiledContract = solc.compile(contract);
// Get ABI definition. This is the interface of the contract.
const abiDefinition = JSON.parse(compiledContract.contracts[':Counter'].interface);
// Create contract
const CounterContract = new web3.eth.Contract(abiDefinition, address);

CounterContract.methods.getValue().call({}, function (error, result) {
  if (error) return console.log(error);
  console.log(`Counter: ${result}`);
})
