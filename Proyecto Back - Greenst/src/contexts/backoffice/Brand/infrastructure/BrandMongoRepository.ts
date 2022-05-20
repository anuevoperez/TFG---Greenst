import Brand from "../domain/Brand";
import BrandRepository from "../domain/BrandRepository";
import { BrandModel } from "./BrandModel";

export default class BrandMongoRepository implements BrandRepository {
  async save(brand: Brand): Promise<void> {
    if (!brand._id) {
      await BrandModel.create(brand);
      return;
    }
    await BrandModel.updateOne(
      { _id: brand._id },
      { $set: { ...brand, _id: undefined } },
    );
  }
  async findAll(): Promise<Brand[] | null> {
    const brands = await BrandModel.find({});
    const result: Brand[] = brands.map((brand) => ({
      _id: brand._id,
      img: brand.img,
      brandName: brand.brandName,
    }));
    return result;
  }
  async findById(id: string): Promise<Brand | null> {
    return await BrandModel.findById(id);
  }
  async deleteById(id: string): Promise<void> {
    await BrandModel.deleteOne({ _id: id });
  }
}
