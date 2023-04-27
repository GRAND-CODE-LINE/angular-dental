// DATOS NECESARIOS PARA QUE SE HAGA LA PAGINACION
export interface Filter_I {
    page: number,
    size: number,
    sortFiled?: string,
    sortOrder?: number
}

// OBJETO DE PAGINACION QUE DEVUELVE SPRING DATA
export interface Paginate_I {
    content: any[],
    last: boolean,
    totalPages: number,
    totalElements: number,
    size: number,
    number: 0,
    sort: {
        empty: boolean,
        sorted: boolean,
        unsorted: boolean
    },
    first: boolean,
    empty: false
}