export default interface RandomTokenService{
    generateToken():Promise<string>;
    encryptToken(token:string):Promise<string>;
    verifyToken(token:string,encryptedToken:string):Promise<boolean>;
}