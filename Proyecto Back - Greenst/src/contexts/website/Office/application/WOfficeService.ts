import OfficeRepository from "../domain/OfficeRepository";

export default class WOfficeService{
    private _officeRepository:OfficeRepository;
    constructor(officeRepository:OfficeRepository){
        this._officeRepository=officeRepository;
    }

    async findAll(){
        return await this._officeRepository.findAll();
    }
   
}