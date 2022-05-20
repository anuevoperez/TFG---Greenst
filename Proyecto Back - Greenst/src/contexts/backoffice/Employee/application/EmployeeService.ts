import EncryptionService from "../../../auth/Authentication/application/EncryptionService";
import Pagination from "../../../shared/domain/Pagination";
import Employee from "../domain/Employee";
import EmployeeFilters from "../domain/EmployeeFilters";
import EmployeeRepository from "../domain/EmployeeRepository";

export default class EmployeeService{
    private _employeeRepository:EmployeeRepository;
    private _encryptionService:EncryptionService;
    constructor(employeeRepository:EmployeeRepository,encryptionService:EncryptionService ){
        this._employeeRepository=employeeRepository;
        this._encryptionService=encryptionService;
    }
    async insertEmployee(employee:Employee){
        if(!employee.password) throw new Error("Password is missing")
        const encPassword= this._encryptionService.encrypt(employee.password);
        await this._employeeRepository.save({...employee, _id:undefined,password:encPassword});
    }
    async updateEmployee(employee:Employee){
        if(!employee._id) throw new Error("Missing employee id");
        let updatedEmployee=employee;
        
        if(employee.password){
            const encPassword= this._encryptionService.encrypt(employee.password);
            updatedEmployee={...employee,password:encPassword}
        }
        await this._employeeRepository.save({...updatedEmployee});
    }
    async findAll(filter:EmployeeFilters,pagination:Pagination){
        return await this._employeeRepository.findAll(filter,pagination);
    }
    async findById(id:string){
        return await this._employeeRepository.findById(id);
    }
}