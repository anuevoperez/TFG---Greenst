export default interface Pagination{
    limit:number;
    sortField?:string;
    sortAscending:boolean;
    next?:string,
    previous?:string
}