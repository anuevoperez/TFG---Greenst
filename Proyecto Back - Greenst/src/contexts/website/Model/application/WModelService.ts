import Model from "../domain/Model";
import ModelFilters from "../domain/ModelFilters";
import ModelRepository from "../domain/ModelRepository";

export default class WModelService {
  private _modelRepository: ModelRepository;
  constructor(modelRepository: ModelRepository) {
    this._modelRepository = modelRepository;
  }
  async findById(id: string,filters:ModelFilters) {
    return await this._modelRepository.findById(id,filters);
  }
  async findAll(modelFilters: ModelFilters) {
    return await this._modelRepository.findAll(modelFilters);
  }
}
