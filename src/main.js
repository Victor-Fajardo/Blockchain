const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Your private key goes here
const myKey = ec.keyFromPrivate('7c4c45907dec40c91bab3480c39032e90049f1a44f3e18c3e07c23e3273995cf');

// From that we can calculate your public key (which doubles as your wallet address)
const myWalletAddress = myKey.getPublic('hex');

// Create new instance of Blockchain class
const ctorre = new Blockchain();

// Mine first block
ctorre.minePendingTransactions(myWalletAddress);

// Create a transaction & sign it with your key
const tx1 = new Transaction(myWalletAddress, 'address2', "Carlos Toore");
tx1.signTransaction(myKey);
ctorre.addTransaction(tx1);

// Mine block
ctorre.minePendingTransactions(myWalletAddress);

// Create second transaction
const tx2 = new Transaction(myWalletAddress, 'address1', 'Jose Aldana');
tx2.signTransaction(myKey);
ctorre.addTransaction(tx2);

// Mine block
ctorre.minePendingTransactions(myWalletAddress);

console.log();
console.log(`Balance of xavier is ${ctorre.getBalanceOfAddress(myWalletAddress)}`);

// Uncomment this line if you want to test tampering with the chain
// ctorre.chain[1].transactions[0].amount = 10;

// Check if the chain is valid
console.log();
console.log('Blockchain valid?', ctorre.isChainValid() ? 'Yes' : 'No');
