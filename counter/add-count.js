const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');
const argv = require('yargs').argv;

const contractPath = `${__dirname}/../contracts/Counter.sol`;
const address = '0xC6536C84e24496A939cbE2A2C107Ab4aA0Bbaf25';
const from = '0x218c072046d9accab6c01a182686f0b28df309b1'

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

CounterContract.methods.increment().send({from}, function (error, Tx) {
  if (error) return console.log(error);
  console.log(`Tx: ${Tx}`);
})
