"use strict";

const PASSPHRASE = "mlhphrime2017@teamalpha";
const KEY_SIZE = 512;

function generateNewKey() {
    "use strict";
    console.log("Gen new key");

    let options = {
        userIds: "",     // multiple user IDs
        numBits: KEY_SIZE,                                          // RSA key size
        passphrase: PASSPHRASE                                      // protects the private key
    };

    return openpgp.generateKey(options).then(function(key) {

        let generatedKey = {};
        generatedKey.private_key = key.privateKeyArmored; // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
        generatedKey.public_key = key.publicKeyArmored;   // '-----BEGIN PGP PUBLIC KEY BLOCK ... '

        return generatedKey;
    });
}

$("#buttkeygen").click(() => {
    console.log("Key gen");
});