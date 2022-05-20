import RandomTokenService from "../application/RandomTokenService";
import crypto from "crypto";
export default class RandomCryptoTokenService implements RandomTokenService {
  async generateToken(): Promise<string> {
    return crypto.randomBytes(32).toString("hex");
  }
  async encryptToken(token: string): Promise<string> {
    return crypto.createHash("sha256").update(token).digest("hex");
  }
  async verifyToken(token: string, encryptedToken: string): Promise<boolean> {
    const realToken = crypto.createHash("sha256").update(token).digest("hex");
    return realToken===encryptedToken;
  }
}
