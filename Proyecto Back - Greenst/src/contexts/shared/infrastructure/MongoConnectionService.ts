import mongoose from "mongoose";
import Connection from "../domain/Connection";
class MongoConnection implements Connection{
    readonly db_user:string;
    readonly db_password:string;
    readonly db_path:string;
    constructor(db_user:string,db_password:string,db_path:string){
        this.db_user=db_user;
        this.db_password=db_password;
        this.db_path=db_path;
    }
    async connect(): Promise<void> {
        await mongoose.connect(`mongodb://${this.db_user}:${this.db_password}${this.db_path}`);   
        console.log("Connection sucessful!");
    }
}
export default MongoConnection;