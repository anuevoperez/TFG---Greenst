import Brand from "./Brand";

export default interface BrandRepository{
    findAll():Promise<null|Brand[]>;
}