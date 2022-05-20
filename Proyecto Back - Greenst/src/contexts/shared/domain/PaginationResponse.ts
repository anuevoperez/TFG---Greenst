export default interface PaginationResponse{
    hasNext?:boolean|undefined;
    hasPrevious?:boolean|undefined;
    next?:string|undefined;
    previous?:string|undefined;
    totalDocs:number;
}