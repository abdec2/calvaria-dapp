"use strict";

const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;

const ICO_CONTRACT_ADDRESS = "0x7DcfD322b3C0A04bcc51557cE0e5C1Cf980c5c5f";
const USDT_CONTRACT = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const NETWORK_ID = 1;
const NETWORK_NAME = "Ethereum mainnet";

const ICOABI = [{"inputs":[{"internalType":"uint256","name":"__rate","type":"uint256"},{"internalType":"address payable","name":"_wallet90","type":"address"},{"internalType":"address payable","name":"_wallet10","type":"address"},{"internalType":"contract IERC20","name":"__token","type":"address"},{"internalType":"address","name":"__tokenWallet","type":"address"},{"internalType":"address","name":"usdt","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"purchaser","type":"address"},{"indexed":true,"internalType":"address","name":"beneficiary","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokensPurchased","type":"event"},{"stateMutability":"nonpayable","type":"fallback"},{"inputs":[{"internalType":"address","name":"beneficiary","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"buyTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"remainingTokens","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wallet","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wallet10","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"weiRaised","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"stateMutability":"payable","type":"receive"}];
const TokenAbi = [{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint8","name":"_decimals","type":"uint8"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"__decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];

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