import Office from "../domain/Office";
import OfficeRepository from "../domain/OfficeRepository";

export default class OfficeService{
    private _officeRepository:OfficeRepository;
    constructor(officeRepository:OfficeRepository){
        this._officeRepository=officeRepository;
    }
    async insertOffice(office:Office){
        await this._officeRepository.save({...office,_id:undefined})
    }
    async updateOffice(office:Office){
        if(!office._id) throw new Error("Missing office id")
        await this._officeRepository.save(office);
    }
    async findAll(){
        return await this._officeRepository.findAll();
    }
    async findById(id:string){
        return await this._officeRepository.findById(id);
    }
    async deleteById(id:string){
        return await this._officeRepository.deleteById(id)
    }
}