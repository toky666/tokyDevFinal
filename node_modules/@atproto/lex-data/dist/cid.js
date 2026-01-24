"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CID = exports.SHA2_256_MULTIHASH_CODE = exports.RAW_BIN_MULTICODEC = exports.DAG_CBOR_MULTICODEC = void 0;
exports.asCid = asCid;
exports.parseCid = parseCid;
exports.decodeCid = decodeCid;
exports.createCid = createCid;
exports.isCid = isCid;
exports.validateCidString = validateCidString;
exports.parseCidString = parseCidString;
exports.ensureValidCidString = ensureValidCidString;
const cid_1 = require("multiformats/cid");
Object.defineProperty(exports, "CID", { enumerable: true, get: function () { return cid_1.CID; } });
exports.DAG_CBOR_MULTICODEC = 0x71;
exports.RAW_BIN_MULTICODEC = 0x55;
exports.SHA2_256_MULTIHASH_CODE = 0x12;
function asCid(value) {
    return cid_1.CID.asCID(value);
}
function parseCid(input) {
    return cid_1.CID.parse(input);
}
function decodeCid(bytes) {
    return cid_1.CID.decode(bytes);
}
function createCid(code, digest) {
    return cid_1.CID.createV1(code, digest);
}
function isCid(value, options) {
    const cid = asCid(value);
    if (!cid) {
        return false;
    }
    if (options?.strict) {
        if (cid.version !== 1) {
            return false;
        }
        if (cid.code !== exports.RAW_BIN_MULTICODEC && cid.code !== exports.DAG_CBOR_MULTICODEC) {
            return false;
        }
        if (cid.multihash.code !== exports.SHA2_256_MULTIHASH_CODE) {
            return false;
        }
    }
    return true;
}
function validateCidString(input) {
    return parseCidString(input)?.toString() === input;
}
function parseCidString(input) {
    try {
        return parseCid(input);
    }
    catch {
        return undefined;
    }
}
function ensureValidCidString(input) {
    if (!validateCidString(input)) {
        throw new Error(`Invalid CID string`);
    }
}
//# sourceMappingURL=cid.js.map