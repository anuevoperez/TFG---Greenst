import BrandSchema from "../../Brand/infrastructure/BrandSchema";
import Model from "../domain/Model";
import ModelRepository from "../domain/ModelRepository";
import BasicModelProjection from "../domain/projections/BasicModelProjection";
import DetailedModelProjection from "../domain/projections/DetailedModelProjection";
import { ModelModel } from "./ModelModel";

export default class ModelMongoRepository implements ModelRepository {
  async save(model: Model): Promise<void> {
    const newModel = {
      _id: model._id,
      img: model.img,
      brand: model.brand_id,
      modelName: model.modelName,
    };
    if (!model._id) {
      await ModelModel.create(newModel);
      return;
    }
    await ModelModel.updateOne(
      { _id: newModel._id },
      { $set: { ...newModel, _id: undefined } }
    );
  }
  async findAll(brand_id?: string): Promise<BasicModelProjection[] | null> {
    const query: any = {};
    if (brand_id) query.brand = brand_id;
    const models = await ModelModel.find(query);
    const result = models.map(
      (model): BasicModelProjection => ({
        _id: model._id,
        img: model.img,
        modelName: model.modelName,
      })
    );
    return result;
  }
  async findById(id: string): Promise<DetailedModelProjection | null> {
    const model = await ModelModel.findById(id).populate({
      path: "brand",
      select: "_id img brandName",
    });
    if (!model) {
      return null;
    }
    const brand: any = model.brand!;
    const result: DetailedModelProjection = {
      _id: model._id,
      img: model.img,
      modelName: model.modelName,
      price:model.price,
      brand: {
        _id: brand._id as string,
        img: brand.img as string,
        brandName: brand.brandName as string,
      },
    };
    return result;
  }
}
