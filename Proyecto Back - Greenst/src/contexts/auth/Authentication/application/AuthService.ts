import User from "../../User/domain/User";
import TokenPayload from "../domain/TokenPayload";
import TokenService from "./TokenService";
import EmailService from "./EmailService";
import MailOptions from "../domain/MailOptions";
import UserService from "../../User/application/UserService";

class AuthService {
  private _tokenService: TokenService;
  //private _encryptionService: EncryptionService;
  //private _userRepository: UserRepository;
  private _emailService: EmailService;
  private _userService: UserService;
  //private _randomTokenService: RandomTokenService;

  constructor(
    tokenService: TokenService,
    emailService: EmailService,
    userService: UserService
  ) {
    this._tokenService = tokenService;
    //this._encryptionService = encryptionService;
    //this._userRepository = userRepository;
    this._emailService = emailService;
    this._userService = userService;
    //this._randomTokenService = randomTokenService;
  }

  async authUser(email: string, password: string): Promise<any> {
    const user = await this._userService.authUser(email, password);
    const token= this._tokenService.generateAccessToken({
      id: user._id as string,
      name: user.name as string,
      lastName: user.lastName as string,
      office_id: user.office_id,
      role: user.role,
    });
    return{
      user,
      token
    }
  }

  async verifyToken(token: string): Promise<null | TokenPayload> {
    return await this._tokenService.verifyToken(token);
  }
  async recoverPassword(
    email: string,
    resetURL: string,
    mailOptions: MailOptions
  ): Promise<void> {
    const resetToken = await this._userService.assignResetRandomToken(email);

    const newResetURL = resetURL + resetToken;

    await this._emailService.sendEmail({
      from: mailOptions.from,
      to: email,
      subject: mailOptions.subject,
      text: mailOptions.text?.replace("$URL", newResetURL),
    });
  }
  async verifyResetToken(resetToken: string): Promise<User | null> {
    return await this._userService.verifyResetToken(resetToken);
  }
  async updatePassword(
    userId: string,
    currentPassword: any,
    newPassword: any,
    confirmNewPassword: any
  ) {
    await this._userService.updatePassword(
      userId,
      currentPassword,
      newPassword,
      confirmNewPassword
    );
  }
  async resetPassword(token: string, password: any, passwordConfirm: any) {
    await this._userService.resetPassword(token, password, passwordConfirm);
  }
}
export default AuthService;
