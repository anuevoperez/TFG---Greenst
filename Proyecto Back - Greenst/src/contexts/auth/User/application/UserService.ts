import UserRepository from "../domain/UserRepository";
import EncryptionService from "../../Authentication/application/EncryptionService";
import User from "../domain/User";
import RandomTokenService from "../../Authentication/application/RandomTokenService";
import UserRoles from "../domain/UserRoles";
import { CustomerModel } from "../infrastructure/CustomerModel";
import { EmployeeModel } from "../infrastructure/EmployeeModel";

export default class UserService {
  private _userRepository: UserRepository;
  private _randomTokenService: RandomTokenService;
  private _encryptionService: EncryptionService;

  constructor(
    userRepository: UserRepository,
    encryptionService: EncryptionService,
    randomTokenService: RandomTokenService
  ) {
    this._userRepository = userRepository;
    this._randomTokenService = randomTokenService;
    this._encryptionService = encryptionService;
  }
  private async checkRole(user: User) {
    const { role } = user;
    if (role === UserRoles.CLIENTE) {
      const customer = await CustomerModel.findOne({ user: user._id });
      if (!customer) throw new Error("XD");
      return {
        ...JSON.parse(JSON.stringify(user)),
        name: customer.name,
        lastName: customer.lastName,
      };
    }

    const employee = await EmployeeModel.findOne({ user: user._id });
    if (!employee) throw new Error("XD");
    return {
      ...JSON.parse(JSON.stringify(user)),
      name:employee.name,
      lastName:employee.lastName,
      office_id: employee.office,
    } as User;
  }
  async findById(userId: string) {
    const user = await this._userRepository.findById(userId);
    if (!user) throw new Error("User not found");
    return await this.checkRole(user);
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await this._userRepository.findByEmail(email);
    if (!user) throw new Error("User not found");
    return await this.checkRole(user);
  }
  async findByResetToken(resetToken: string): Promise<User | null> {
    const user = await this.findByResetToken(resetToken);
    if (!user) throw new Error("User not found");
    return await this.checkRole(user);
  }
  async updateUser(user: User): Promise<void> {
    if (!user._id) throw new Error("User object must have an id");
    await this._userRepository.save(user);
  }
  async assignResetRandomToken(email: string): Promise<string> {
    const user = await this.findByEmail(email);
    if (!user || !user.enabled) {
      throw new Error("User not found");
    }
    const resetToken = await this._randomTokenService.generateToken();
    const encryptedToken = await this._randomTokenService.encryptToken(
      resetToken
    );
    user.passwordResetToken = encryptedToken;
    user.passwordResetExpires = new Date();
    await this.updateUser(user);
    return resetToken;
  }
  async verifyResetToken(resetToken: string): Promise<User | null> {
    const encryptedToken = await this._randomTokenService.encryptToken(
      resetToken
    );
    const user = await this._userRepository.findByResetToken(encryptedToken);
    return user;
  }
  async resetPassword(
    resetToken: string,
    password: string,
    passwordConfirm: string
  ) {
    const user = await this.verifyResetToken(resetToken);
    if (!user) {
      throw new Error("Token is invalid or has expired");
    }
    if (password != passwordConfirm) {
      throw new Error("Password doesn't match");
    }
    user.password = this._encryptionService.encrypt(password);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await this.updateUser(user);
  }
  async authUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) throw new Error("User not found");
    if (!user.enabled) throw new Error("User is temporary banned");
    console.log(user);
    const passwordIsValid = this._encryptionService.compare(
      password,
      user.password
    );
    if (!passwordIsValid) throw new Error("Wrong password!");
    return await this.checkRole(user);
  }
  async updatePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string
  ) {
    const user = await this._userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found!");
    }
    const isValid = this._encryptionService.compare(
      currentPassword,
      user!.password
    );
    if (!isValid) {
      throw new Error("current password is wrong");
    }
    if (newPassword != confirmNewPassword) {
      throw new Error("New Password doesn't match");
    }
    user!.password = this._encryptionService.encrypt(newPassword);
    user!.passwordChangedAt = new Date();
    await this._userRepository.save(user!);
  }
}
