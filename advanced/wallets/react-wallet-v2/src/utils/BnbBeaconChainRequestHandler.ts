import { BBC_SIGNING_METHODS } from '@/data/BnbBeaconChainData'
import { getWalletAddressFromParams } from '@/utils/HelperUtil'
import { formatJsonRpcError, formatJsonRpcResult } from '@json-rpc-tools/utils'
import { SignClientTypes } from '@walletconnect/types'
import { getSdkError } from '@walletconnect/utils'
import { bnbBeaconChainAddresses, bnbBeaconChainWallets } from './BnbBeaconChainWalletUtil'
import {
  generatePubKey,
} from '@bnb-chain/javascript-sdk/lib/crypto'
import { toHex } from 'viem'
import secp256k1 from 'tiny-secp256k1'
import sha256 from 'crypto-js/sha256'

const signMessage = (privateKey: string, message: string) => {
  const privKey = Uint8Array.from(Buffer.from(privateKey, 'hex'))
  const msg = sha256(toHex(message)).toString();
  const sigObj = secp256k1.sign(Buffer.from(msg, 'hex'), Buffer.from(privKey))

  return '0x' + Buffer.from(sigObj).toString('hex')
}


export async function approveBbcRequest(
  requestEvent: SignClientTypes.EventArguments['session_request']
) {
  const { params, id } = requestEvent
  const { request } = params
  const wallet = bnbBeaconChainWallets[getWalletAddressFromParams(bnbBeaconChainAddresses, params)]

  switch (request.method) {
    case BBC_SIGNING_METHODS.BBC_SIGN:
      const message = request.params.message
      const pk = '0x' + generatePubKey(Buffer.from(wallet.privateKey, 'hex')).encode('hex', true)
      const signedMsg = signMessage(wallet.privateKey, message)
      return formatJsonRpcResult(id, { signature: signedMsg, publicKey: pk })

    default:
      throw new Error(getSdkError('INVALID_METHOD').message)
  }
}

export function rejectBbcRequest(request: SignClientTypes.EventArguments['session_request']) {
  const { id } = request

  return formatJsonRpcError(id, getSdkError('USER_REJECTED_METHODS').message)
}
