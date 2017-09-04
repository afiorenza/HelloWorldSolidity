const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');

// Connects to blockchain
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const contractPath = `${__dirname}/../contracts/Counter.sol`;
const from = '0x218c072046d9accab6c01a182686f0b28df309b1';

// Read contract from file system
const contract = fs.readFileSync(contractPath).toString();
// Compiles the contract
const compiledContract = solc.compile(contract);
// Get ABI definition. This is the interface of the contract.
const abiDefinition = JSON.parse(compiledContract.contracts[':Counter'].interface);
// Get byteCode (result of compiled contract)
const byteCode = compiledContract.contracts[':Counter'].bytecode;
// Create contract
const Contract = new web3.eth.Contract(abiDefinition);

// Deploy with initial parameters
Contract.deploy({data: `0x${byteCode}`, arguments: []})
  .send({from})
  .on('error', function (error) {console.log('Error ', error);})
  .then(function (newContractInstance) {
    if (newContractInstance) {
      console.log(`Address: ${newContractInstance.options.address}`);
    }
  });
