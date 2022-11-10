"use strict";

const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;

const ICO_CONTRACT_ADDRESS = "0xdcA01DE41584631c6F2579123b130b4eE708D9A9";
const USDT_CONTRACT = "0xa7161D14B3A4F3C0Aec14531364d39Bad4942C4d";
const NETWORK_ID = 5;
const NETWORK_NAME = "Goerli";

const ICOABI = [{"inputs":[{"internalType":"uint256","name":"__rate","type":"uint256"},{"internalType":"address payable","name":"_wallet90","type":"address"},{"internalType":"address payable","name":"_wallet10","type":"address"},{"internalType":"contract IERC20","name":"__token","type":"address"},{"internalType":"address","name":"__tokenWallet","type":"address"},{"internalType":"address","name":"usdt","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"purchaser","type":"address"},{"indexed":true,"internalType":"address","name":"beneficiary","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensPurchased","type":"event"},{"stateMutability":"nonpayable","type":"fallback"},{"inputs":[{"internalType":"address","name":"beneficiary","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"buyTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"remainingTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wallet","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wallet10","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"weiRaised","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}];
const TokenAbi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_upgradedAddress","type":"address"}],"name":"deprecate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"deprecated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_evilUser","type":"address"}],"name":"addBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"upgradedAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maximumFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],"name":"getBlackListStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newBasisPoints","type":"uint256"},{"name":"newMaxFee","type":"uint256"}],"name":"setParams","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"redeem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"basisPointsRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isBlackListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clearedUser","type":"address"}],"name":"removeBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_blackListedUser","type":"address"}],"name":"destroyBlackFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAddress","type":"address"}],"name":"Deprecate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"feeBasisPoints","type":"uint256"},{"indexed":false,"name":"maxFee","type":"uint256"}],"name":"Params","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_blackListedUser","type":"address"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"DestroyedBlackFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"AddedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"RemovedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}];

// Web3modal instance
let web3Modal

// Chosen wallet provider given by the dialog window
let provider;


// Address of the selected account
let selectedAccount;

const accountChangedHandler = async (newAccount) => {
    selectedAccount = await newAccount.getAddress();
}

const switchNetwork =  async () => {
    window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [{
            chainId: "0x5",
            rpcUrls: ["https://goerli.infura.io/v3/"],
            chainName: "Goerli",
            nativeCurrency: {
                name: "GoerliETH",
                symbol: "GoerliETH",
                decimals: 18
            },
            blockExplorerUrls: ["https://goerli.etherscan.io"]
        }]
    });
    
}

const connectMetamask = async () => {
    provider = new ethers.providers.Web3Provider(window.ethereum)
    if (window.ethereum) {
        provider.send("eth_requestAccounts", []).then(async () => {
            await accountChangedHandler(provider.getSigner());
            onConnect()


            window.ethereum.on('accountsChanged', (accounts) => {
                selectedAccount = accounts[0]
            })
            window.ethereum.on('chainChanged', (chainId) => {
                window.location.reload();
            })
        })
        
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Please Install Metamask!!!`
        })
    }
}

const walletConnect = async () => {
    const web3Provider = new WalletConnectProvider({
        infuraId: "1e9edd21f07e462e96f6f7e6a9799b0e",
    });

    await web3Provider.enable()

    provider = new ethers.providers.Web3Provider(web3Provider);

    await accountChangedHandler(provider.getSigner())
    onConnect()

    web3Provider.on("accountsChanged", (accounts) => {
        selectedAccount = accounts[0]
      });
      
      // Subscribe to chainId change
      web3Provider.on("chainChanged", (chainId) => {
        window.location.reload();
      });

      web3Provider.on("disconnect", () => {
        window.location.reload();
      });
      
      
}



function init() {

    console.log("Initializing example");
    console.log("WalletConnectProvider is", WalletConnectProvider);
    console.log("window.web3 is", window.web3, "window.ethereum is", window.ethereum);

    // Tell Web3modal what providers we have available.
    // Built-in web browser provider (only one can exist as a time)
    // like MetaMask, Brave or Opera is added automatically by Web3modal
    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                // Mikko's test key - don't copy as your mileage may vary
                infuraId: "0b184a8d42254b289c25034d52459a7d",
            }
        }
    };

    web3Modal = new Web3Modal({
        providerOptions, // required
    });

    console.log("Web3Modal instance is", web3Modal);
}

async function fetchAccountData() {

    const network = await provider.getNetwork();
    const chainId = network.chainId;

    if (chainId !== NETWORK_ID) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Contract is not deployed on the selected network please choose ${NETWORK_NAME} network`
        }).then(()=>{
            disconnect();
        })
        return;
        // await switchNetwork()
    }

}

function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(2)) + 'k' : Math.sign(num)*Math.abs(num)
}

/**
* Connect wallet button pressed.
*/
async function onConnect() {
    document.querySelector('#connectDiv').style.display = "none"
    document.querySelector('#tokenPurchase').style.display = "flex"
    await fetchAccountData()
}


/**
* Disconnect wallet button pressed.
*/
async function disconnect() {
    document.location.reload()
}


async function buyTokenContract(price) {
    try {
        let signer = provider.getSigner();
        let icoContract = new ethers.Contract(ICO_CONTRACT_ADDRESS, ICOABI, signer);
        let estimateGas = await icoContract.estimateGas.buyTokens(selectedAccount, price.toString());
        console.log(estimateGas.toString())
        let tx = await icoContract.buyTokens(selectedAccount, price.toString(), { gasLimit: estimateGas.toString() });
        await tx.wait();
        Swal.fire({
            icon: 'success',
            text: `Purchase Done`
        })
    } catch(e) {
        stopLoading();
        const {error, code} = e
        if(error.code === -32000) {
            Swal.fire({
                icon: 'error',
                text: 'Insufficient funds available for this transaction'
            })
        } else {
            console.log(error)
            console.log(code)
        }
    }
}

async function startLoading() {
    document.querySelector("#btnBuy").setAttribute('disabled', 'disabled');
    document.querySelector('#btnBuy').innerHTML = 'Processing...';
}

async function stopLoading() {
    document.querySelector("#btnBuy").removeAttribute('disabled');
    document.querySelector('#btnBuy').innerHTML = 'Buy';
}

const approve = async (price) => {
    try {
        let signer = provider.getSigner();
        let usdt = new ethers.Contract(USDT_CONTRACT, TokenAbi, signer);
        let estimateGas = await usdt.estimateGas.approve(ICO_CONTRACT_ADDRESS, price.toString());
        console.log(estimateGas.toString())
        let tx = await usdt.approve(ICO_CONTRACT_ADDRESS, price.toString(), { gasLimit: estimateGas.toString() });
        await tx.wait();

    } catch(e) {
        stopLoading();
        const {error, code} = e
        if(error.code === -32000) {
            Swal.fire({
                icon: 'error',
                text: 'Insufficient funds available for this transaction'
            })
        } else {
            console.log(error)
            console.log(code)
        }
    }
} 

const handleRatesOnChange = () => {
    let amount = document.querySelector('#price').value;
    const regExp = /^[0-9]\d*(\.\d+)?$/;
    if (!amount.match(regExp)) {
        document.querySelector('#price').value = ''
        return;
    }
    const rates = parseFloat(amount) * 40
    document.querySelector('#rates').value = kFormatter(rates);

}

async function buyTokens() {
    let amount = document.querySelector('#price').value;
    if (amount === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Please enter Amount`
        })
        return;
    }

    const regExp = /^[0-9]\d*(\.\d+)?$/;
    if (!amount.match(regExp)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Please enter the correct amount`
        })
        return;
    }

    if (selectedAccount !== null && selectedAccount !== undefined) {
        try {
            const price = ethers.utils.parseUnits(amount, '6');
            startLoading();
            await approve(price);
            await buyTokenContract(price)
            document.querySelector('#price').value = 0
            document.querySelector('#rates').value = 0
            stopLoading();
        } catch (e) {
            stopLoading();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Something went wrong`
            })
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `Connect your wallet`
        })
    }
}

async function addToken() {
    const tokenAddress = TOKEN_CONTRACT;
    const tokenSymbol = "PUPIPAY";
    const tokenDecimals = 18;
    const tokenImage = '';

    try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        const wasAdded = await window.ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20', // Initially only supports ERC20, but eventually more!
                options: {
                    address: tokenAddress, // The address that the token is at.
                    symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                    decimals: tokenDecimals, // The number of decimals in the token
                    image: tokenImage, // A string url of the token logo
                },
            },
        });

        if (wasAdded) {
            console.log('Thanks for your interest!');
        } else {
            console.log('Your loss!');
        }
    } catch (error) {
        console.log(error);
    }
}


/**
 * Main entry point.
 */
// window.addEventListener('load', async () => {
//     init();
//     document.querySelector("#btn-connect").addEventListener("click", onConnect);
//     document.querySelector("#btn-disconnect").addEventListener("click", onDisconnect);
// });