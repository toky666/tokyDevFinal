"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLexLink = parseLexLink;
exports.encodeLexLink = encodeLexLink;
const lex_data_1 = require("@atproto/lex-data");
function parseLexLink(input) {
    if (!input || !('$link' in input)) {
        return undefined;
    }
    for (const key in input) {
        if (key !== '$link') {
            return undefined;
        }
    }
    if (typeof input.$link !== 'string') {
        throw new TypeError('$link must be a base32-encoded CID string');
    }
    if (input.$link.length === 0) {
        throw new TypeError('CID string in $link cannot be empty');
    }
    // Arbitrary limit to prevent DoS via extremely long CIDs
    if (input.$link.length > 2048) {
        throw new TypeError('CID string in $link is too long');
    }
    try {
        return (0, lex_data_1.parseCid)(input.$link);
    }
    catch (cause) {
        throw new TypeError('Invalid CID string in $link', { cause });
    }
}
function encodeLexLink(cid) {
    return { $link: cid.toString() };
}
//# sourceMappingURL=link.js.map