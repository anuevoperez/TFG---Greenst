import Pagination from "../../../shared/domain/Pagination";
import GeoJSONSchema from "../../../shared/infrastructure/GeoJSONSchema";
import BrandSchema from "../../Brand/infrastructure/BrandSchema";
import { ModelModel } from "../../Model/infrastructure/ModelModel";
import { OfficeModel } from "../../Office/infrastructure/OfficeModel";
import BasicPagedVehicleProjection from "../domain/projections/BasicPagedVehicleProjection";
import BasicVehicleProjection from "../domain/projections/BasicVehicleProjection";
import FullVehicleProjection from "../domain/projections/FullVehicleProjection";
import Vehicle from "../domain/Vehicle";
import VehicleFilters from "../domain/VehicleFilters";
import VehicleRepository from "../domain/VehicleRepository";
import { VehicleModel } from "./VehicleModel";

export default class VehicleMongoRepository implements VehicleRepository {
  async save(vehicle: Vehicle): Promise<void> {
    const model = await ModelModel.findById(vehicle.model_id).populate({
      path: "brand",
      select: "_id brandName",
    });
    if (!model) {
      throw new Error("Model not found");
    }
    const brand: any = model.brand!;

    const office = await OfficeModel.findById(vehicle.office_id);

    if (!office) {
      throw new Error("Office not found");
    }

    const vehicleMDB = {
      _id: vehicle._id,
      type: vehicle.type,
      plate: vehicle.plate,
      office: vehicle.office_id,
      city: office.city,
      v_model: vehicle.model_id,
      modelName: model.modelName,
      brand: brand._id as string,
      brandName: brand.brandName as string,
      vin: vehicle.vin,
      status: vehicle.status,
      registrationDate: vehicle.registrationDate,
      lastRevision: vehicle.lastRevision,
    };
    if (!vehicleMDB._id) {
      await VehicleModel.create(vehicleMDB);
      return;
    }

    await VehicleModel.updateOne(
      { _id: vehicleMDB._id },
      { $set: { ...vehicleMDB, _id: undefined } }
    );
  }
  async insertMany(vehicles: Vehicle[]): Promise<void> {
    const models_ids = new Set();
    const offices_ids = new Set();

    vehicles.forEach(({ model_id, office_id }) => {
      if (!model_id) throw new Error("Vehicles must have model_id");
      if (!office_id) throw new Error("Vehicles must have office_id");
      offices_ids.add(office_id);
      models_ids.add(model_id);
    });
    const models = await ModelModel.find({
      model: { $in: [...models_ids] },
    }).populate({
      path: "brand",
      select: "_id brandName",
    });

    if (models.length != models_ids.size) {
      throw new Error("There are invalid models");
    }

    const offices = await OfficeModel.find({
      model: { $in: [...offices_ids] },
    }).populate({
      path: "city",
      select: "_id",
    });

    const models_map = new Map();
    const offices_map = new Map();

    models.forEach((model) => {
      models_map.set(model._id, model);
    });

    offices.forEach((office) => {
      offices_map.set(office._id, office);
    });

    const newVehicles = vehicles.map((vehicle) => {
      const model = models_map.get(vehicle.model_id);
      const office = offices_map.get(vehicle.office_id);
      const city: any = office.city;
      const brand: any = model.brand;
      return {
        type: vehicle.type,
        plate: vehicle.plate,
        office: vehicle.office_id,
        city: city._id as string,
        v_model: vehicle.model_id,
        brand: brand._id as string,
        brandName: brand.brandName as string,
        modelName: model.modelName,
        vin: vehicle.vin,
        status: vehicle.status,
        registrationDate: vehicle.registrationDate,
        lastRevision: vehicle.lastRevision,
      };
    });
    await VehicleModel.insertMany(newVehicles);
  }

  async findAll(
    filter: VehicleFilters,
    pagination: Pagination
  ): Promise<BasicPagedVehicleProjection> {
    const query: any = {};
    if (filter.type) {
      query.type = filter.type;
    }
    if (filter.office_id) {
      query.office = filter.office_id;
    }
    if (filter.plate) {
      query.plate = { $regex: filter.plate ,$options:'i'};
    }
    if (filter.brand_id) {
      query.brand = filter.brand_id;
    }
    if (filter.modelName) {
      query.modelName = { $regex: filter.modelName ,$options:'i'};
    }
    if (filter.status) {
      query.status = filter.status;
    }
    if (filter.minRegistrationDate) {
      query.registrationDate = {
        $gte: filter.minRegistrationDate,
      };
    }
    if (filter.maxRegistrationDate) {
      query.registrationDate = {
        ...query?.registrationDate,
        $lte: filter.minRegistrationDate,
      };
    }
    if (filter.minRevisionDate) {
      query.minRevisionDate = {
        $gte: filter.minRevisionDate,
      };
    }
    if (filter.maxRevisionDate) {
      query.maxRevisionDate = {
        ...query?.maxRevisionDate,
        $lte: filter.maxRevisionDate,
      };
    }

    const projection: any = {
      _id: 1,
      type: 1,
      plate: 1,
      brand: 1,
      modelName: 1,
      status: 1,
    };
    const populate: any = [
      {
        path: "brand",
        select: "_id brandName",
      },
    ];
    console.log(pagination);
    const vehicles = await VehicleModel.findPaged(
      pagination,
      query,
      projection,
      populate
    );
    const docs: BasicVehicleProjection[] = vehicles.docs.map(
      ({ _id, type, plate, brand, modelName, status }) => {
        const brandName = (brand as BrandSchema).brandName;
        return {
          _id,
          type,
          plate,
          brandName,
          modelName,
          status,
        };
      }
    );
    const result: BasicPagedVehicleProjection = {
      hasNext: vehicles.hasNext, // hasNext is true if there is a next page
      hasPrevious: vehicles.hasPrevious, // hasPrevious is true if there is a previous page
      next: vehicles.next, // next is the cursor for the next page
      previous: vehicles.previous, // previous is the cursor for the previous page
      totalDocs: vehicles.totalDocs, // totalDocs is the total amount of docs for the query
      docs,
    };
    return result;
  }
  async findById(id: string): Promise<FullVehicleProjection | null> {
    const vehicle = await VehicleModel.findById(id)
      .select(
        "type plate brand v_model office vin status registrationDate lastRevision"
      )
      .populate([
        {
          path: "brand",
          select: "_id img brandName",
        },
        {
          path: "v_model",
          select: "_id img modelName",
        },
        {
          path: "office",
          select: "_id locationName location",
          populate: {
            path: "city",
            select: "_id cityName",
          },
        },
      ]);
    if (!vehicle) return null;
    const brand: any = vehicle.brand;
    const model: any = vehicle.v_model;
    const office: any = vehicle.office;
    const city: any = office.city;
    const officeLocation: GeoJSONSchema = office.location;
    const cityName: any = city.cityName;
    const result: FullVehicleProjection = {
      type: vehicle.type,
      plate: vehicle.plate,
      brand: {
        _id: brand._id as string,
        img: brand.img as string,
        brandName: brand.brandName as string,
      },
      model: {
        _id: model._id as string,
        img: model.img as string,
        modelName: model.modelName as string,
      },
      office: {
        _id: office._id as string,
        location: [
          officeLocation.coordinates[1],
          officeLocation.coordinates[0],
        ],
        city:cityName,
        locationName: office.locationName as string,
      },
      vin: vehicle.vin,
      status: vehicle.status,
      registrationDate: vehicle.registrationDate,
      lastRevision: vehicle.lastRevision,
    };
    return result;
  }
  async deleteById(id: string): Promise<void> {
    await VehicleModel.deleteOne({ _id: id });
  }
}
