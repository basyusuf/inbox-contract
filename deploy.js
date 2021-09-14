const HDwalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');
const mnemonic_keys = process.env.mnemonic;
const rinkeby_url = process.env.rinkeby_url;

const provider = new HDwalletProvider(
    mnemonic_keys,
    rinkeby_url,
)
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.info("Account: ", accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ["Hi message!"] })
        .send({ from: accounts[0], gas: '1000000', gasPrice: '5000000000' })

    console.info("Smart Contract address:", result.options.address);
}
deploy();
