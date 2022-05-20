import bcrypt from "bcrypt";
import Encryption from "../application/EncryptionService";
class BCryptService implements Encryption{
    private saltRounds:number=10;
    encrypt(value: string): string {
        return bcrypt.hashSync(value,this.saltRounds);
    }
    compare(value: string, encryptedValue: string): boolean {
        return bcrypt.compareSync(value,encryptedValue);
    }
}
export default BCryptService;