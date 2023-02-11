let utils = require('./dist/index')
utils = utils.default
console.log(utils)
const init = () => {
    const publicKeyHex = '0x929085e8eb38fa3fd76e152854b8cbf846df888d41b0003c0052f42913cc2919'
    const signedDataHex =
        '0x34fdebc0317630bdc8f6478607fec090f7a7ffeba9fcea4c57c9f2a323777a82c77bb6816031004545419fa05b5f540991f42fe1b2df4bf6a7ade58baa766b02'
    const message = 'test'

    const address = utils.getAddressFromPublicKey(publicKeyHex)
    // address 1qzqzuz09xsz8n6zvz6mhnzn7fnm5al4yy035t56h3vumxqll6jn3c2khyg4
    console.log(address)
    const bool1 = utils.verifySignature(signedDataHex, publicKeyHex, message)
    const bool2 = utils.verifyDataSignedByAddress(signedDataHex, publicKeyHex, message, address)
    console.log(bool1, bool2)
}
init()
