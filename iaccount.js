//	@ghasemkiani/hdwallet/iaccount

import {cutil} from "@ghasemkiani/base";
import {HDWallet} from "./index.js";

const iaccount = {
	hdpath: HDWallet.prototype.HDPATH_TRUSTWALLET_BTC,
	index: 0,
	mnemonic: null,
	_hdwallet: null,
	get hdwallet() {
		if (!this._hdwallet) {
			this._hdwallet = new HDWallet();
		}
		return this._hdwallet;
	},
	set hdwallet(hdwallet) {
		this._hdwallet = hdwallet;
	},
	_key: null,
	get key() {
		if (cutil.isNilOrEmptyString(this._key) && this.mnemonic) {
			this._key = this.hdwallet.getPrivateKeyFromMnemonic(this.mnemonic, this.hdpath, this.index)
		}
		return this._key;
	},
	set key(key) {
		this._key = key;
	},
}

export {iaccount};
