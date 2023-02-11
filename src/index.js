import { Bech32, Blake2b, Ed25519 } from '@iota/crypto.js'
import { Converter } from '@iota/util.js'

const ED25519_ADDRESS_TYPE = 0
const hexToBytes = (hex) => {
    hex = hex.replace(/^0x/i, '')
    return Converter.hexToBytes(hex)
}
const toBech32 = (addressType, addressBytes, humanReadablePart) => {
    const addressData = new Uint8Array(1 + addressBytes.length)
    addressData[0] = addressType
    addressData.set(addressBytes, 1)
    return Bech32.encode(humanReadablePart, addressData)
}
export default {
    getAddressFromPublicKey(publicKeyHex) {
        let addressBytes = Blake2b.sum256(hexToBytes(publicKeyHex))
        const humanReadablePart = ''
        return toBech32(ED25519_ADDRESS_TYPE, addressBytes, humanReadablePart)
    },
    verifySignature(signedDataHex, publicKeyHex, message) {
        const signedData = hexToBytes(signedDataHex)
        const publicKey = hexToBytes(publicKeyHex)
        const messageData = Converter.utf8ToBytes(message)
        const verify = Ed25519.verify(publicKey, messageData, signedData)
        return verify
    },
    verifyDataSignedByAddress(signedDataHex, publicKeyHex, message, address) {
        address = address.replace(/^((iota)|(atoi)|(smr)|(rms))/i, '')
        const verify = this.verifySignature(signedDataHex, publicKeyHex, message)
        let addressVerify = this.getAddressFromPublicKey(publicKeyHex) === address
        return verify && addressVerify
    }
}
