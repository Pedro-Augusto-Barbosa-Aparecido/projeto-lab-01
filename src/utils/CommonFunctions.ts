interface ICommonFunctionsPaginate {
  objectList: any;
  page: number;
  limit: number;
}

export class CommonFunctions {
  paginate({ objectList, page, limit }: ICommonFunctionsPaginate) {
    return objectList.slice((page - 1) * limit, (page - 1) * limit + limit);
  }
}
