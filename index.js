const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');
const argv = require('yargs').argv;

const gas = argv.gas || 1500000;
const teams = argv.teams || ['NOB', 'Central', 'Boca', 'River'];

// Connects to blockchain
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// Get the first address
web3.eth.getAccounts().then(function (addresses) {
  const from = addresses[0];
  // Read contract from file system
  const contract = fs.readFileSync('Positions.sol').toString();
  // Compiles the contract
  const compiledContract = solc.compile(contract);
  // Get ABI definition. This is the interface of the contract.
  const abiDefinition = JSON.parse(compiledContract.contracts[':Positions'].interface);
  // Get byteCode (result of compiled contract)
  const byteCode = compiledContract.contracts[':Positions'].bytecode;
  // Create contract
  const PositionsContract = new web3.eth.Contract(abiDefinition);
  // Deploy with initial parameters
  PositionsContract.deploy({data: byteCode, arguments: [teams]})
    .send({from, gas})
    .on('error', function (error) {console.log('Error ', error);})
    .then(function (newContractInstance) {
      if (newContractInstance) {
        console.log(`Address: ${newContractInstance.options.address}`);
      }
    });
});
