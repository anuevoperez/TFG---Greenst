import Brand from "../domain/Brand";
import BrandRepository from "../domain/BrandRepository";
import { BrandModel } from "./BrandModel";

export default class WBrandMongoRepository implements BrandRepository {
  async findAll(): Promise<Brand[] | null> {
    const brands = await BrandModel.find({});
    const result: Brand[] = brands.map((brand) => ({
      _id: brand._id,
      img: brand.img,
      brandName: brand.brandName,
    }));
    return result;
  }
}
