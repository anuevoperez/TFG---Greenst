import Coordinate from "../../../shared/domain/Coordinate";
import GeoJSONSchema from "../../../shared/infrastructure/GeoJSONSchema";
import { CitySchema } from "../../City/infrastructure/CitySchema";
import Office from "../domain/Office";
import OfficeRepository from "../domain/OfficeRepository";
import BasicOfficeProjection from "../domain/projections/BasicOfficeProjection";
import DetailedOfficeProjection from "../domain/projections/DetailedOfficeProjection";
import { OfficeModel } from "./OfficeModel";
export default class OfficeMongoRepository implements OfficeRepository {
  async save(office: Office): Promise<void> {
    const newOffice = {
      city: office.city_id,
      locationName: office.locationName,
      postalCode: office.postalCode,
      fullLocation: office.fullLocation,
      telephone: office.telephone,
      location: {
        type: "Point",
        coordinates: [office.location[1], office.location[0]],
      },
      status: office.status,
    };
    if (!office._id) {
      await OfficeModel.create(newOffice);
    }
    await OfficeModel.updateOne(
      { _id: office._id },
      { $set: { ...newOffice } }
    );
  }
  async insertMany(offices: Office[]): Promise<void> {
    const newOffices = offices.map((office) => ({
      city: office.city_id,
      locationName: office.locationName,
      postalCode: office.postalCode,
      fullLocation: office.fullLocation,
      telephone: office.telephone,
      location: {
        type: "Point",
        coordinates: [office.location[1], office.location[0]],
      },
      status: office.status,
    }));
    await OfficeModel.insertMany(newOffices);
  }
  async findAll(): Promise<BasicOfficeProjection[] | null> {
    const rawOffices = await OfficeModel.find(
      {},
      { _id: 1, city: 1, locationName: 1, location: 1 }
    ).populate({
      path: "city",
      select: "_id cityName",
    });
    const offices: BasicOfficeProjection[] = rawOffices.map((rawOffice) => {
      const city = rawOffice.city as any ;
      const location = rawOffice.location as GeoJSONSchema;
      return {
        _id: rawOffice._id,
        city_id:city._id,
        city: city.cityName,
        locationName: rawOffice.locationName,
        location: [location.coordinates[1], location.coordinates[0]],
      };
    });
    return offices;
  }
  async findById(id: string): Promise<DetailedOfficeProjection | null> {
    const rawOffice = await OfficeModel.findById(id).populate({
      path: "city",
      select: "cityName",
    });
    if (!rawOffice) throw new Error("Office not found!");
    const city = rawOffice.city as CitySchema;
    const location = rawOffice.location as GeoJSONSchema;
    return {
      city: city.cityName,
      locationName: rawOffice.locationName,
      postalCode: rawOffice.postalCode,
      fullLocation: rawOffice.fullLocation,
      telephone: rawOffice.telephone,
      location: [location.coordinates[1], location.coordinates[0]],
      status: rawOffice.status,
    };
  }

  async deleteById(id: string): Promise<void> {
    await OfficeModel.deleteOne({ _id: id });
  }
}
