//	@ghasemkiani/hdwallet

const bip32 = require("bip32");
const bip39 = require("bip39");

const {cutil} = require("@ghasemkiani/commonbase/cutil");
const {Base} = require("@ghasemkiani/commonbase/base");

class HDWallet extends Base {
	generateMnemonic(mnemonicLen = 256) {
	  return bip39.generateMnemonic(mnemonicLen);
	}
	validateMnemonic(mnemonic) {
		return bip39.validateMnemonic(mnemonic);
	}
	getPrivateKeyFromMnemonic(mnemonic, hdpath = "44'/714'/0'/0/", index = 0) {
		if(!this.validateMnemonic(mnemonic)) {
			throw new Error("wrong mnemonic format");
		}
		let password = "";
		let seed = bip39.mnemonicToSeedSync(mnemonic, password);
		let master = bip32.fromSeed(seed);
		let child = master.derivePath(hdpath + cutil.asString(index));
		return child.privateKey.toString("hex");
	}
}
cutil.extend(HDWallet.prototype, {
	mnemonic: null,
	privateKey: null,
	HDPATH_BINANCE_CHAIN: "44'/714'/0'/0/",
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
	HDPATH_ATOMICWALLET_NEO: "m/44'/888'/0'/",
	HDPATH_ATOMICWALLET_ONG: "m/44'/1024'/0'/0/",
	HDPATH_ATOMICWALLET_QTUM: "m/44'/2301'/0'/0/",
	HDPATH_ATOMICWALLET_SMART: "m/44'/224'/0'/0/",
	HDPATH_ATOMICWALLET_TPAY: "m/44'/265'/0'/", // ****** added slash at the end
	HDPATH_ATOMICWALLET_TRX: "m/44'/195'/0'/", // ****** added slash at the end
	HDPATH_ATOMICWALLET_VET: "m/44'/818'/0'/0/",
	HDPATH_ATOMICWALLET_WAVES: "m/44'/5741564'/0'/0/",
	HDPATH_ATOMICWALLET_XEM: "m/44'/43'/0'/0/",
	HDPATH_ATOMICWALLET_XLM: "m/44'/148'/0'/", // ****** added slash at the end
	HDPATH_ATOMICWALLET_XRP: "m/44'/144'/0'/0/",
	HDPATH_ATOMICWALLET_XTZ: "m/44'/1729'/0'/0/",
	HDPATH_ATOMICWALLET_ZEC: "m/44'/133'/0'/0/",
});

module.exports = {HDWallet};

// https://support.atomicwallet.io/article/146-list-of-derivation-paths
