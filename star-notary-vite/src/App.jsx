import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const StarNotaryABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "approved",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "ApprovalForAll",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "buyStar",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "createStar",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId1",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId2",
				"type": "uint256"
			}
		],
		"name": "exchangeStars",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "putStarUpForSale",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "safeTransferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "setApprovalForAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "transferStar",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "getApproved",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getStarsForSale",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "operator",
				"type": "address"
			}
		],
		"name": "isApprovedForAll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "lookUpTokenIdToStarInfo",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "ownerOf",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "starsForSale",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "starsForSaleList",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tokenIdToStarInfo",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]; // Replace with your ABI file
const contractAddress = '0xe1fBB22074Ce8D3C10D78E4D51304a8841f65C85'; // Replace with your contract address
const yourAccountAddress = '0x7FC3785B57B9f314296591B68ccB0fe9fAc54D49'; // Replace with your Ethereum address

const App = () => {
  const [tokenId, setTokenId] = useState('');
  const [starName, setStarName] = useState('');
  const [price, setPrice] = useState(0);
  const [starsForSale, setStarsForSale] = useState([]);

  // Initialize Web3
  let web3;
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    web3 = new Web3(window.ethereum);
    window.ethereum.enable();
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider('YOUR_INFURA_OR_LOCAL_PROVIDER_URL'));
  }

  // Initialize the contract
  const contract = new web3.eth.Contract(StarNotaryABI, contractAddress);

  // Function to look up star information
  const lookUpTokenIdToStarInfo = async () => {
    try {
      const name = await contract.methods.lookUpTokenIdToStarInfo(tokenId).call();
      setStarName(name);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to get stars for sale
  const getStarsForSale = async () => {
    const starIds = await contract.methods.getStarsForSale().call();
    setStarsForSale(starIds);
  };

  // Function to exchange stars
  const exchangeStars = async (tokenId1, tokenId2) => {
    try {
      await contract.methods.exchangeStars(tokenId1, tokenId2).send({ from: yourAccountAddress });
      console.log('Stars exchanged successfully');
    } catch (error) {
      console.error(error);
    }
  };

  // Function to transfer a star
  const transferStar = async (toAddress, tokenId) => {
    try {
      await contract.methods.transferStar(toAddress, tokenId).send({ from: yourAccountAddress });
      console.log(`Star Token ID ${tokenId} transferred to ${toAddress}`);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to create a star
  // Example of sending a transaction with gas limit
async function createStar(name, tokenId) {
  try {
    const gas = await contract.methods.createStar(name, tokenId).estimateGas({ from: yourAccountAddress });
    await contract.methods.createStar(name, tokenId).send({ from: yourAccountAddress, gas });
    console.log(`Star Token ID ${tokenId} created with name: ${name}`);
  } catch (error) {
    console.error(error);
  }
}


  // Function to put a star up for sale
  const putStarUpForSale = async (tokenId, price) => {
    try {
      await contract.methods.putStarUpForSale(tokenId, price).send({ from: yourAccountAddress });
      console.log(`Star Token ID ${tokenId} put up for sale at price: ${price} ETH`);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to buy a star
  const buyStar = async (tokenId, price) => {
    try {
      await contract.methods.buyStar(tokenId).send({ from: yourAccountAddress, value: price });
      console.log(`Star Token ID ${tokenId} purchased for ${price} ETH`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getStarsForSale();
  }, []);

  

  return (
    <div>
      <h1>Star Notary Dapp</h1>
      <div>
        <input
          type="text"
          placeholder="Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />
        <button onClick={lookUpTokenIdToStarInfo}>Get Star Name</button>
        {starName && <p>Star Name: {starName}</p>}
      </div>
      <div>
        <input
          type="text"
          placeholder="Star Name"
          value={starName}
          onChange={(e) => setStarName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />
        <button onClick={() => createStar(starName, tokenId)}>Create Star</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="To Address"
          value={starName}
          onChange={(e) => setStarName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />
        <button onClick={() => transferStar(starName, tokenId)}>Transfer Star</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Token ID 1"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Token ID 2"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />
        <button onClick={() => exchangeStars(tokenId, tokenId)}>Exchange Stars</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price (ETH)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button onClick={() => putStarUpForSale(tokenId, price)}>Put Star Up for Sale</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />
        <button onClick={() => buyStar(tokenId, price)}>Buy Star</button>
      </div>
      <div>
        <h2>Stars for Sale</h2>
        <ul>
          {starsForSale.map((starId) => (
            <li key={starId}>
              Token ID: {starId}
              <button onClick={() => buyStar(starId, price)}>Buy</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
