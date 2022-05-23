import User from "../domain/User";
import UserRepository from "../domain/UserRepository";
import { UserModel } from "./UserModel";
import Pagination from "../../../shared/domain/Pagination";
import UserRoles from "../domain/UserRoles";
import { CustomerModel } from "./CustomerModel";
import { EmployeeModel } from "./EmployeeModel";
class UserMongoRepository implements UserRepository {
  async save(user: User): Promise<void> {
    if (user._id) {
      const xd = await UserModel.updateOne(
        { _id: user._id },
        { $set: { ...user, _id: undefined } },
        { upsert: true }
      );
      return;
    }
  }
 
  async findById(userId: string): Promise<User | null> {
    const user = await UserModel.findOne({ _id: userId, enabled: true });
    if (!user) return null;
    return user;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email });
    if (!user) return null;
    return user;
  }
  async findByResetToken(resetToken: string): Promise<User | null> {
    const user = await UserModel.findOne({
      passwordResetToken: resetToken,
      passwordResetExpires: { $gt: new Date() },
      enabled: true,
    });
    if (!user) return null;
    return user;
  }
}
export default UserMongoRepository;
