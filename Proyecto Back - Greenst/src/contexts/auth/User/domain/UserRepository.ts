import User from "./User"

interface UserRepository{
    save(user:User): Promise<void>
    findById(userId:string):Promise<null|User>
    findByEmail(email:string):Promise<null|User>
    findByResetToken(resetToken:string):Promise<null|User>
}
export default UserRepository