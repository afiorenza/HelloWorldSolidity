const Web3 = require('web3');

const from = '0x2d66f6e87128ab032c7bd9c771ed221fe3800b40';
const accountToAdd = process.argv[2];

process.on('exit', (code) => {
  switch (code) {
    case 1:
      console.log(`The public account ${accountToAdd} is not valid.`);
      break;
    default:
      console.log('');
      break;
  }
});

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

if (!web3.utils.isAddress(accountToAdd)) process.exit(1);

const abiDefinition = JSON.parse(`[{"constant":false,"inputs":[{"name":"validator","type":"address"}],"name":"addValidator","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"get","outputs":[{"name":"","type":"address[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"finalizeChange","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"validator","type":"address"},{"name":"blockNumber","type":"uint256"},{"name":"proof","type":"bytes"}],"name":"reportMalicious","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"validator","type":"address"},{"name":"blockNumber","type":"uint256"}],"name":"reportBenign","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"disliked","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_parent_hash","type":"bytes32"},{"indexed":false,"name":"_new_set","type":"address[]"}],"name":"InitiateChange","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"current_set","type":"address[]"}],"name":"ChangeFinalized","type":"event"}]`);

var contractInstance = new web3.eth.Contract(abiDefinition, '0x0000000000000000000000000000000000000005');

contractInstance.methods.addValidator(accountToAdd)
  .send({from}, function (error, tx) {
    if (error) {
      console.log(`Error: ${error}`);
      return;
    }
    console.log(`Tx: ${tx}`);
  })
