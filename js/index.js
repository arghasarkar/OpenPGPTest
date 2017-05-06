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

function encrypt() {
    let options, encrypted;

    let publicKey = document.getElementById("publicKey").value;
    let privateKey = document.getElementById("privateKey").value;
    let passphrase = 'secret passphrase'; //what the privKey is encrypted with

    // let privateKeyObj = openpgp.key.readArmored(privateKey).keys[0];
    // privateKeyObj.decrypt(passphrase);

    options = {
        data: document.getElementById("message").value,                 // input as String (or Uint8Array)
        publicKeys: openpgp.key.readArmored(publicKey).keys,            // for encryption
        //  privateKeys: privateKeyObj // for signing (optional)
    };

    console.log(options);

    openpgp.encrypt(options).then(function(ciphertext) {
        encrypted = ciphertext.data; // '-----BEGIN PGP MESSAGE ... END PGP MESSAGE-----'

        $("#message").val(encrypted);
    });
}

$("#buttEncrypt").click( () => {
    encrypt();
});