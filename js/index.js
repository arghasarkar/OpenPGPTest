"use strict";

var openpgp = window.openpgp; // use as CommonJS, AMD, ES6 module or via window.openpgp
/*

openpgp.initWorker({ path:'openpgp.worker.js' }) // set the relative web worker path

*/

const PASSPHRASE = "mlhphrime2017@teamalpha";
const KEY_SIZE = 1024;

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
        generatedKey.privateKey = key.privateKeyArmored; // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
        generatedKey.publickey = key.publicKeyArmored;   // '-----BEGIN PGP PUBLIC KEY BLOCK ... 'K
        generatedKey.options = options;

        return generatedKey;
    });
}

$("#buttKeyGen").click(() => {


    generateNewKey().then((keys) => {
        $("#privateKey").val(keys.privateKey);
        $("#publicKey").val(keys.publickey);
        $("#privateKeyPass").val(keys.options.passphrase);

        console.log(keys);
    })
});