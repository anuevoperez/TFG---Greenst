interface Connection{
    readonly db_user:string;
    readonly db_password:string;
    readonly db_path:string;
    connect():Promise<void>
}
export default Connection;