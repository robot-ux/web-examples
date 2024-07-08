import CosmosLib from '@/lib/CosmosLib'
import { crypto as bCrypto } from '@bnb-chain/javascript-sdk'

type WalletType = {
  address: string,
  privateKey: string,
}
export let wallet1: WalletType
export let wallet2: WalletType
export let bnbBeaconChainWallets: Record<string, WalletType>
export let bnbBeaconChainAddresses: string[]

let address1: string
let address2: string

const getKeyAndAddress = (index: number, addressPrefix: string, mnemonic?: string) => {
  const _m = mnemonic || bCrypto.generateMnemonic();
  const k = bCrypto.getPrivateKeyFromMnemonic(_m, true, index);
  return {
    privateKey: k,
    address: bCrypto.getAddressFromPrivateKey(k, addressPrefix)
  };
}

/**
 * Utilities
 */
export async function createOrRestoreBnbBeaconChainWallet() {
  const mnemonic1 = localStorage.getItem('BEACON_CHAIN_MNEMONIC_1')
  const mnemonic2 = localStorage.getItem('BEACON_CHAIN_MNEMONIC_2')

  if (mnemonic1 && mnemonic2) {
    wallet1 = getKeyAndAddress(0, 'tbnb', mnemonic1);
    wallet2 = getKeyAndAddress(1, 'tbnb', mnemonic2);
  } else {
    const m1 = bCrypto.generateMnemonic();
    const m2 = bCrypto.generateMnemonic();

    wallet1 = getKeyAndAddress(0, 'tbnb', m1);
    wallet2 = getKeyAndAddress(1, 'tbnb', m2);
    
    // Don't store mnemonic in local storage in a production project!
    localStorage.setItem('BEACON_CHAIN_MNEMONIC_1', m1)
    localStorage.setItem('BEACON_CHAIN_MNEMONIC_2', m2)
  }

  address1 = wallet1.address
  address2 = wallet2.address

  bnbBeaconChainWallets = {
    [address1]: wallet1,
    [address2]: wallet2
  }
  bnbBeaconChainAddresses = Object.keys(bnbBeaconChainWallets)

  return {
    bnbBeaconChainWallets,
    bnbBeaconChainAddresses
  }
}
