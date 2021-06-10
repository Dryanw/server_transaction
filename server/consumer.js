const contractAddress = '0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab';
const ABI = require('./contract_abi.js')
var amqp = require('amqplib/callback.api');

const Web3 = require('web3');
var Tx = require('ethereumjs-tx').Transaction;
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
web3.eth.getAccounts(console.log);
var TestContract = new web3.eth.Contract(ABI, contractAddress);


const account = '0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1';
const privateKey = Buffer.from('4f3edf983ac636a65a842ce7c78d9aa706d3b113bce9c46f30d7d21715b23b1d', 'hex');

amqp.connect('amqp://localhost', function(err0, connection) {
    if (err0) {console.log(err0);}
    connection.createChannel(function(err1, channel) {
        if (err1) {console.log(err1);}
        channel.assertExchange('winner', 'fanout', {durable: false});
        channel.assertQueue('', {exclusive: true}, function (err2, q) {
            console.log(`Waiting for messages in ${q.queue}. Press CTRL+C to exit`);
            channel.bindQueue(q.queue, 'winner', '');
            channel.consume(q.queue, function(msg) {
                if (msg.content) {
                    var _data = TestContract.methods.setWinner(msg.content.toString()).encodeABI();
                    web3.eth.getTransactionCount(account).then(nonce => {
                        var rawTx = {
                            nonce: nonce,
                            gasPrice: '0x20000000000',
                            gasLimit: '0x27511',
                            to: contractAddress,
                            value: 0,
                            data: _data
                        };
                        var tx = new Tx(rawTx);
                        tx.sign(privateKey);
                        var serializedTx = tx.serialize();
                        web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).on('receipt', console.log);
                    });
                }
            })
        })
    })
})