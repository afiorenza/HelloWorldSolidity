const Web3 = require('web3');

const from = '0x8e3Cb81475191b33aa42bd4Bb644b32a6814c944';
const accountToRemove = process.argv[2];

process.on('exit', (code) => {
  switch (code) {
    case 1:
      console.log(`The public account ${accountToRemove} is not valid.`);
      break;
    default:
      console.log('');
      break;
  }
});

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

if (!web3.utils.isAddress(accountToRemove)) process.exit(1);

const abiDefinition = JSON.parse(`[{"constant":false,"inputs":[{"name":"value","type":"address"}],"name":"removeValidator","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"validator","type":"address"}],"name":"addValidator","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"finalizeChange","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getValidators","outputs":[{"name":"","type":"address[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"_disliked","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_parent_hash","type":"bytes32"},{"indexed":false,"name":"_new_set","type":"address[]"}],"name":"InitiateChange","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"current_set","type":"address[]"}],"name":"ChangeFinalized","type":"event"}]`);

var contractInstance = new web3.eth.Contract(abiDefinition, '0x0000000000000000000000000000000000000005');
// second paramteter must be deleted
contractInstance.methods.removeValidator(accountToRemove).send({from}, function (error, tx) {
  if (error) {
    console.log(`Error: ${error}`);
    return;
  }
  console.log(`Address removed. Tx: ${tx}`);
})
