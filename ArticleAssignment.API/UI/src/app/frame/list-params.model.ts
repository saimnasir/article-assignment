export class ListParams {
    skip = 0;
    take = 10;
    pageable: {
                buttonCount: number,
                info: boolean,
                type: string,
                pageSizes: number[],
                previousNext: boolean,
                refresh: boolean
              } | boolean = {
                            buttonCount: 5, // when type is numeric
                            info: true,
                            type: 'input', // 'numeric'
                            pageSizes: [10, 20, 50, 100], // true
                            previousNext: true,
                            refresh: true
                          };
    filtered = false;
    filter?: any = {logic: 'and', filters: []}; // Kendo Grid filters
    sort: any = [];
    group?: any = [];
    queryParams: Map<string, any> = new Map<string, any>();  // SP parameters
    dateFields = [];
}