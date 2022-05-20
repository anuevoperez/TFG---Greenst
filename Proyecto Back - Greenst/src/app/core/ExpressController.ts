import { Router } from "express";

interface ExpressController{
    mainRoute:string;
    router:Router
}
export default ExpressController;