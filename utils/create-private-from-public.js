var EthUtil = require('ethereumjs-util');
var Web3 = require('web3');

var web3 = new Web3();

var privateKeyToAddress = function(privateKey) {
  return `0x${EthUtil.privateToAddress(web3.utils.hexToBytes(privateKey)).toString('hex')}`;
}

console.log(`Private key: ${web3.utils.sha3(process.argv[2])}`);
console.log(`Public key: ${privateKeyToAddress(web3.utils.sha3(process.argv[2]))}`);
