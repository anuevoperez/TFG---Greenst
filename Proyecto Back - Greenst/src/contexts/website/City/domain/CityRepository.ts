import City from "./City";
export default interface CityRepository{
    findAll():Promise<null|City[]>;
}