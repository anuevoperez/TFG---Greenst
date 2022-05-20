import TokenPayload from "../domain/TokenPayload";

interface TokenService{
    generateAccessToken(payload?:TokenPayload):string;
    verifyToken(token:string):Promise<TokenPayload|null>
}
export default TokenService;