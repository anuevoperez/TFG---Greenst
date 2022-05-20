import GeoJSONSchema from "../../../shared/infrastructure/GeoJSONSchema";

import OfficeRepository from "../domain/OfficeRepository";
import BasicOfficeProjection from "../domain/projections/BasicOfficeProjection";
import { OfficeModel } from "./OfficeModel";
export default class WOfficeMongoRepository implements OfficeRepository {
  async findAll(): Promise<BasicOfficeProjection[] | null> {
    const rawOffices = await OfficeModel.find(
      {},
      { _id: 1, city: 1, locationName: 1, location: 1 }
    ).populate({
      path: "city",
      select: "_id cityName",
    });
    const offices: BasicOfficeProjection[] = rawOffices.map((rawOffice) => {
      const city = rawOffice.city as any;
      const location = rawOffice.location as GeoJSONSchema;
      return {
        _id: rawOffice._id,
        city_id: city._id,
        city: city.cityName,
        locationName: rawOffice.locationName,
        location: [location.coordinates[1], location.coordinates[0]],
      };
    });
    return offices;
  }
}
