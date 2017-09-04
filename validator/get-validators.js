const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const abiDefinition = JSON.parse(`[{"constant":false,"inputs":[{"name":"validator","type":"address"}],"name":"addValidator","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"validator","type":"address"},{"name":"blockNumber","type":"uint256"}],"name":"reportMalicious","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"finalizeChange","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getValidators","outputs":[{"name":"","type":"address[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"_disliked","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"validator","type":"address"}],"name":"reportBenign","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_parent_hash","type":"bytes32"},{"indexed":false,"name":"_new_set","type":"address[]"}],"name":"InitiateChange","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"current_set","type":"address[]"}],"name":"ChangeFinalized","type":"event"}]`);

var contractInstance = new web3.eth.Contract(abiDefinition, '0x0000000000000000000000000000000000000005');

contractInstance.methods.getValidators().call({}, function (error, result) {
  if (error) console.log(`Error: ${error}`);
  console.log(`Result: ${result}`);
})
