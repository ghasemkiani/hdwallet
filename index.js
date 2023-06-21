//	@ghasemkiani/hdwallet

import bip32 from "bip32";
import bip39 from "bip39";

import {cutil} from "@ghasemkiani/base";
import {Obj} from "@ghasemkiani/base";

class HDWallet extends Obj {
	generateMnemonic(mnemonicLen = 256) {
	  return bip39.generateMnemonic(mnemonicLen);
	}
	validateMnemonic(mnemonic) {
		return bip39.validateMnemonic(mnemonic);
	}
	getPrivateKeyFromMnemonic(mnemonic, hdpath = "m/44'/714'/0'/0/", index = 0) {
		if(!this.validateMnemonic(mnemonic)) {
			throw new Error("wrong mnemonic format");
		}
		let password = "";
		let seed = bip39.mnemonicToSeedSync(mnemonic, password);
		let master = bip32.fromSeed(seed);
		if(cutil.isNumber(index)) {
			if(!/\/$/.test(hdpath)) {
				hdpath += "/";
			}
			hdpath += cutil.asString(index);
		}
		let child = master.derivePath(hdpath);
		return child.privateKey.toString("hex");
	}
}
cutil.extend(HDWallet.prototype, {
	mnemonic: null,
	privateKey: null,
	HDPATH_TRUSTWALLET_BTC: "m/84'/0'/0'/0/",
	HDPATH_TRUSTWALLET_LTC: "m/84'/2'/0'/0/",
	HDPATH_BINANCE_CHAIN: "m/44'/714'/0'/0/",
	HDPATH_ATOMICWALLET_ADA: "m/44'/1815'/0'/0/",
	HDPATH_ATOMICWALLET_ATOM: "m/44'/118'/0'/0/",
	HDPATH_ATOMICWALLET_BCD: "m/44'/999'/0'/0/",
	HDPATH_ATOMICWALLET_BCH: "m/44'/145'/0'/0/",
	HDPATH_ATOMICWALLET_BSV: "m/44'/145'/0'/0/",
	HDPATH_ATOMICWALLET_BTC: "m/44'/0'/0'/0/",
	HDPATH_ATOMICWALLET_BTG: "m/44'/156'/0'/0/",
	HDPATH_ATOMICWALLET_DASH: "m/44'/5'/0'/", // ****** added slash at the end
	HDPATH_ATOMICWALLET_DCR: "m/42'/999'/0'/0/",
	HDPATH_ATOMICWALLET_DGB: "m/44'/20'/0'/0/",
	HDPATH_ATOMICWALLET_DOGE: "m/44'/3'/0'/0/",
	HDPATH_ATOMICWALLET_ETC: "m/44'/0'/0'/0/",
	HDPATH_ATOMICWALLET_ETH: "m/44'/0'/0'/0/",
	HDPATH_ATOMICWALLET_GAS: "m/44'/888'/0'/",
	HDPATH_ATOMICWALLET_GRS: "m/44'/0'/0'/0/",
	HDPATH_ATOMICWALLET_KIN: "m/44'/148'/0'/", // ****** added slash at the end
	HDPATH_ATOMICWALLET_LSK: "m/44'/134'/0'/0/",
	HDPATH_ATOMICWALLET_LTC: "m/44'/60'/0'/0/",
	HDPATH_METAMASK_ETH: "m/44'/60'/0'/0/",
	HDPATH_METAMASK_BSC: "m/44'/60'/0'/0/",
	HDPATH_CELO: "m/44'/52752'/0'/0/",
	HDPATH_ATOMICWALLET_NEO: "m/44'/888'/0'/",
	HDPATH_ATOMICWALLET_ONG: "m/44'/1024'/0'/0/",
	HDPATH_ATOMICWALLET_QTUM: "m/44'/2301'/0'/0/",
	HDPATH_ATOMICWALLET_SMART: "m/44'/224'/0'/0/",
	HDPATH_ATOMICWALLET_TPAY: "m/44'/265'/0'/", // ****** added slash at the end
	HDPATH_ATOMICWALLET_TRX: "m/44'/195'/0'", // ****** use with index null
	HDPATH_ATOMICWALLET_VET: "m/44'/818'/0'/0/",
	HDPATH_ATOMICWALLET_WAVES: "m/44'/5741564'/0'/0/",
	HDPATH_ATOMICWALLET_XEM: "m/44'/43'/0'/0/",
	HDPATH_ATOMICWALLET_XLM: "m/44'/148'/0'/", // ****** added slash at the end
	HDPATH_ATOMICWALLET_XRP: "m/44'/144'/0'/0/",
	HDPATH_ATOMICWALLET_XTZ: "m/44'/1729'/0'/0/",
	HDPATH_ATOMICWALLET_ZEC: "m/44'/133'/0'/0/",
	HDPATH_TOMOCHAIN: "m/44'/889'/0'/0/",
	HDPATH_THORCHAIN: "m/44'/931'/0'/0/",
});

export {HDWallet};

// https://support.atomicwallet.io/article/146-list-of-derivation-paths
// @binance-chain/javascript-sdk/lib/crypto/index.js
// https://github.com/satoshilabs/slips/blob/master/slip-0044.md
// https://btcrecover.readthedocs.io/en/latest/bip39-accounts-and-altcoins/
