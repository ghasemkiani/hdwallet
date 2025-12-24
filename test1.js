import ecc from "tiny-secp256k1";
import { BIP32Factory } from "bip32";
const bip32 = BIP32Factory(ecc);  // ← This is the key step!
import bip39 from "bip39";
import bitcoin from "bitcoinjs-lib";

const network = bitcoin.networks.bitcoin; // or .testnet

// Example: Create root key from a seed (e.g., from mnemonic)
const mnemonic = bip39.generateMnemonic(); // or use your existing one
const seed = bip39.mnemonicToSeedSync(mnemonic);
const root = bip32.fromSeed(seed, network); // Now works!

// Example derivation (e.g., BIP44 path for Bitcoin)
const path = "m/44'/0'/0'/0/0";
const child = root.derivePath(path);

// Get address (P2PKH example)
const { address } = bitcoin.payments.p2pkh({ pubkey: child.publicKey, network });
console.log('Address:', address);
console.log('Private key (WIF):', child.toWIF());