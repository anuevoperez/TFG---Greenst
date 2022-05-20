import mongoose from "mongoose";
import { VehicleStatus } from "../../../backoffice/Vehicle/domain/VehicleStatus";
import ModelFilters from "../domain/ModelFilters";
import ModelRepository from "../domain/ModelRepository";
import BasicModelProjection from "../domain/projections/BasicModelProjection";
import DetailedModelProjection from "../domain/projections/DetailedModelProjection";
import { VehicleModel } from "./VehicleModel";

export default class WModelMongoRepository implements ModelRepository {
  async findAll(
    modelFilters: ModelFilters
  ): Promise<BasicModelProjection[] | null> {
    const query: any = {};
    if (modelFilters.city_id) {
      query.city = new mongoose.Types.ObjectId(modelFilters.city_id);
    }
    if (modelFilters.type) {
      query.type = modelFilters.type;
    }
    if (modelFilters.office_id) {
      query.office = new mongoose.Types.ObjectId(modelFilters.office_id);
    }
    if (modelFilters.brand_id) {
      query.brand = new mongoose.Types.ObjectId(modelFilters.brand_id);
    }
    if (modelFilters.modelName) {
      query.modelName = { $regex: modelFilters.modelName, $options: "i" };
    }
    query.status = VehicleStatus.AVAILABLE;
    console.log(query);
    const models = await VehicleModel.aggregate([
      {
        $match: query,
      },
      {
        $group: { _id: "$v_model", count: { $count: {} } },
      },
      {
        $lookup: {
          from: "models",
          localField: "_id",
          foreignField: "_id",
          as: "modelInfo",
        },
      },
      {
        $project: {
          _id: 0,
          count: 1,
          modelInfo: { $arrayElemAt: ["$modelInfo", 0] },
        },
      },
      {
        $lookup: {
          from: "brands",
          localField: "modelInfo.brand",
          foreignField: "_id",
          as: "brand",
        },
      },
      {
        $project: {
          count: 1,
          modelInfo: 1,
          brandInfo: { $arrayElemAt: ["$brand", 0] },
        },
      },
    ]).exec();
    console.log(models);
    //const models = await ModelModel.find(query);
    const result: BasicModelProjection[] = models.map((model) => ({
      _id: model.modelInfo._id,
      img: model.modelInfo.img,
      modelName: model.modelInfo.modelName,
      brandName: model.brandInfo.brandName,
      count: model.count,
    }));
    return result;
  }
  async findById(id: string): Promise<DetailedModelProjection | null> {
    const models = await VehicleModel.aggregate([
      {
        $match: { v_model: new mongoose.Types.ObjectId(id) },
      },
      {
        $group: { _id: "$v_model", count: { $count: {} } },
      },
      {
        $lookup: {
          from: "models",
          localField: "_id",
          foreignField: "_id",
          as: "modelInfo",
        },
      },
      {
        $project: {
          _id: 0,
          count: 1,
          modelInfo: { $arrayElemAt: ["$modelInfo", 0] },
        },
      },
      {
        $lookup: {
          from: "brands",
          localField: "modelInfo.brand",
          foreignField: "_id",
          as: "brand",
        },
      },
      {
        $project: {
          count: 1,
          modelInfo: 1,
          brandInfo: { $arrayElemAt: ["$brand", 0] },
        },
      },
    ]).exec();
    console.log(id);
    console.log(models);
    const model = models[0];
    if (!model) throw new Error("Not found");
    const modelInfo: any = model.modelInfo;
    const brandInfo: any = model.brandInfo;

    const result: DetailedModelProjection = {
      _id: modelInfo._id,
      img: brandInfo.img,
      modelName: modelInfo.modelName,
      price: modelInfo.price,
      brand: {
        _id: brandInfo._id as string,
        img: brandInfo.img as string,
        brandName: brandInfo.brandName as string,
      },
      count: model.count,
    };
    return result;
  }
}
