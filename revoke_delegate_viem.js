// 📦 Install dependency terlebih dahulu:
// npm install viem

import { createWalletClient, http, custom, encodeFunctionData } from 'viem'
import { mainnet } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'

// 🔐 Private key dari wallet kamu (PASTIKAN SUDAH KOSONG)
const privateKey = ''
const account = privateKeyToAccount(privateKey)

// 🌐 Buat wallet client dengan RPC Ethereum mainnet
const client = createWalletClient({
  account,
  chain: mainnet,
  transport: http('https://rpc.flashbots.net')
})

async function revokeDelegate() {
  // 📜 Buat authorization kosong (artinya revoke delegate)
  const authorization = await client.signAuthorization({
    executor: 'self',
    contractAddress: '0x0000000000000000000000000000000000000000' // clear delegate
  })

  // 🚀 Kirim transaksi Type 4 ke diri sendiri
  const txHash = await client.sendTransaction({
    to: account.address,
    type: '0x04', // Type 4 transaction
    authorizationList: [authorization],
    value: 0n,
    gas: 100000n
  })

  console.log('✅ TX sent:', txHash)
}

revokeDelegate().catch(console.error)
