
export const calculateTotalPages = (setState:(totalPages:number)=>void, eachCount: number, totalCount: number) => {
    const totalPages = Math.ceil(totalCount / eachCount);
    setState(totalPages);
}