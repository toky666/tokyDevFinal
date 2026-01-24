import { Cid } from '@atproto/lex-data';
import { JsonValue } from './json.js';
export declare function parseLexLink(input?: {
    $link?: unknown;
}): Cid | undefined;
export declare function encodeLexLink(cid: Cid): JsonValue;
//# sourceMappingURL=link.d.ts.map