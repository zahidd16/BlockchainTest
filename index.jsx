import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const MyComponent = () => {
  const [balance, setBalance] = useState(0);
  const [value, setValue] = useState(0);

  const ABI = [
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'x',
          type: 'uint256',
        },
      ],
      name: 'setVal',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getVal',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ];

  const contractAddress = '0xdC9A77b0c6f608F816Ef29d288F686eeEE346975';
  const web3 = new Web3(window.ethereum);

  const contract = new web3.eth.Contract(ABI, contractAddress);

  const updateBalance = async () => {
    const bal = await contract.methods.getVal().call();
    setBalance(bal);
  };

  useEffect(() => {
    updateBalance();
  }, []);

  const handleSet = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    if (accounts && accounts.length > 0) {
      const account = accounts[0];
      const amount = parseInt(value);

      try {
        await contract.methods.setVal(amount).send({ from: account });
        updateBalance();
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        id="amount"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p id="balance">{balance}</p>
      <button id="set" onClick={handleSet}>
        Set
      </button>
      <button id="get" onClick={updateBalance}>
        Get
      </button>
    </div>
  );
};

export default MyComponent;

