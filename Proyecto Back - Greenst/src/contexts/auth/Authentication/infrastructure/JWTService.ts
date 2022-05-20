import User from '../../User/domain/User';
import jwt from 'jsonwebtoken'
import TokenPayload from "../domain/TokenPayload";
import TokenService from "../application/TokenService";
class JWTService implements TokenService{
    secret:string;
    constructor(secret:string|undefined=process.env.TOKEN_SECRET){
        this.secret=secret||"Hello world";
    }
    generateAccessToken(payload: TokenPayload): string {
        return jwt.sign({...payload},this.secret,{expiresIn:"1800s"});
    }
    async verifyToken(token: string): Promise<TokenPayload | null> {
        let res:User|null=null;
        jwt.verify(token,this.secret,(err:any,user:any)=>{
            console.log(err);
            if(err) return;
            res=user as User;
        })
        return res;
    }
    
}
export default JWTService;