import MailOptions from "../domain/MailOptions";

export default abstract class EmailService{
    protected _host:string;
    protected _port:string;
    protected _user:string;
    protected _pass:string;

    constructor(host:string,port:string,user:string,pass:string){
        this._host=host;
        this._port=port;
        this._user=user;
        this._pass=pass;
    }

    abstract sendEmail(mailOptions:MailOptions):Promise<void>;
}