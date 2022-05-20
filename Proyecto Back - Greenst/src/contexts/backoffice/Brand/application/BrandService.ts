import Brand from "../domain/Brand";
import BrandRepository from "../domain/BrandRepository";

export default class BrandService{
    private _brandRepository:BrandRepository;
    constructor(brandRepository:BrandRepository){
        this._brandRepository=brandRepository;
    }
    async insertBrand(brand:Brand){
        await this._brandRepository.save({...brand,_id:undefined});
    }
    async updateBrand(brand:Brand){
        if(!brand._id) throw new Error("Missing brand id");
        await this._brandRepository.save(brand);
    }
    async findAll(){
        return await this._brandRepository.findAll();
    }
    async findById(id:string){
        return await this._brandRepository.findById(id);
    }
}