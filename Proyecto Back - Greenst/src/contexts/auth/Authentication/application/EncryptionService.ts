interface EncryptionService{
    encrypt(value?:string):string
    compare(value:string,encryptedValue:string):boolean
}
export default EncryptionService;