import Model from "../domain/Model";
import ModelRepository from "../domain/ModelRepository";

export default class ModelService{
    private _modelRepository:ModelRepository;
    constructor(modelRepository:ModelRepository){
        this._modelRepository=modelRepository;
    }
    async insertModel(model:Model){
        await this._modelRepository.save({...model,_id:undefined});
    }
    async updateModel(model:Model){
        if(!model._id) throw new Error("Missing model id");
        await this._modelRepository.save(model);
    }
    async findAll(brand_id?:string){
        return await this._modelRepository.findAll(brand_id)
    }
    async findById(id:string){
        return await this._modelRepository.findById(id);
    }
}