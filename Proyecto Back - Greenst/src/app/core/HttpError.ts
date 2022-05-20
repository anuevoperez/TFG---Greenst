import { HttpCode } from "./HttpCode";

class HttpError extends Error{
    status:HttpCode;
    message:string;
    constructor(status:HttpCode,message:string)
    {
        super(message);
        this.status=status
        this.message=message
    }
}
export default HttpError;