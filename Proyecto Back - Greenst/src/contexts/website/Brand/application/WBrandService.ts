import BrandRepository from "../domain/BrandRepository";

export default class WBrandService {
  private _brandRepository: BrandRepository;
  constructor(brandRepository: BrandRepository) {
    this._brandRepository = brandRepository;
  }

  async findAll() {
    return await this._brandRepository.findAll();
  }
}
