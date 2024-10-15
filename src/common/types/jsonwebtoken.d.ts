declare module 'jsonwebtoken' {
    import { SignOptions, VerifyOptions } from 'jsonwebtoken';

    export function sign(
        payload: string | object | Buffer,
        secretOrPrivateKey: string | Buffer,
        options?: SignOptions
    ): string;

    export function verify(
        token: string,
        secretOrPublicKey: string | Buffer,
        options?: VerifyOptions
    ): any;

    export function decode(token: string, options?: { json: true }): object | null;

    export function decode(token: string, options?: { json: false }): string | null;

    // Add other relevant function declarations as needed
}
