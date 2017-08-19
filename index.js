const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');

const TEAMS = ['NOB', 'Central', 'Boca', 'River'];

// Connects to blockchain
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
// Read contract from file system
const contract = fs.readFileSync('Positions.sol').toString();
// Compiles the contract
const compiledContract = solc.compile(contract);
// Get ABI definition. This is the interface of the contract.
const abiDefinition = JSON.parse(compiledContract.contracts[':Positions'].interface);
// Get byteCode (result of compiled contract)
const byteCode = compiledContract.contracts[':Positions'].byteCode;
// Create contract
const PositionsContract = new web3.eth.Contract(abiDefinition);
// Deploy with initial parameters
PositionsContract.deploy({data: byteCode, arguments: [TEAMS]})
  .send({
    from: '83c21e64df59d28ae20f3f37ed0ea240cb4256f0eb91de4c9b78ef7b92cc101f',
    gas: 1500000
  })
  .on('error', function (error) {console.log('Error ', error);})
  .then(function (newContractInstance) {
    console.log(newContractInstance.options.address);
  });
