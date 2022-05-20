import EncryptionService from '../../../auth/Authentication/application/EncryptionService';
import Customer from '../domain/Customer';
import CustomerRepository from '../domain/CustomerRepository';
export default class WCustomerService{
    private _customerRepository:CustomerRepository;
    private _encryptionService:EncryptionService;

    constructor(customerRepository:CustomerRepository,encryptionService:EncryptionService ){
        this._customerRepository=customerRepository;
        this._encryptionService=encryptionService;

    }
    async insertCustomer(customer:Customer){
        if(!customer.password) throw new Error("Password is missing")
        const encPassword= this._encryptionService.encrypt(customer.password);
        await this._customerRepository.save({...customer,_id:undefined,password:encPassword});
    }
    async updateCustomer(customer:Customer){
        if(!customer._id) throw new Error
        await this._customerRepository.save(customer);
    }
    async findById(id:string){
        return await this._customerRepository.findById(id);
    }
  
}