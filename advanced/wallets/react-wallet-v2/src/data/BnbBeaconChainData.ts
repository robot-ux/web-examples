/**
 * Types
 */
export type TBbc_CHAIN = keyof typeof BBC_CHAINS

/**
 * Chains
 */
export const BBC_CHAINS = {
  'bbc:Binance-Chain-Ganges': {
    chainId: 'Binance-Chain-Ganges',
    name: 'BNB Beacon Chain Testnet',
    logo: '/chain-logos/cosmos-cosmoshub-4.png',
    rgb: '107, 111, 147',
    rpc: '',
    namespace: 'bbc'
  }
}


/**
 * Methods
 */
export const BBC_SIGNING_METHODS = {
  BBC_SIGN: 'bbc_sign'
}
