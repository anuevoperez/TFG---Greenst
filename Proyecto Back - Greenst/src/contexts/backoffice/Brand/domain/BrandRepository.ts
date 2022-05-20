import Brand from "./Brand";

export default interface BrandRepository{
    save(brand:Brand):Promise<void>;
    findAll():Promise<null|Brand[]>;
    deleteById(id:string):Promise<void>;
    findById(id:string):Promise<Brand|null>;
}