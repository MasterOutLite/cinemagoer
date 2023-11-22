import {BaseResponse} from "@/type/base-response";

export enum Links {
    main = '/',
    movie = '/movie',// rename dir to movie
    serial = '/serial',
    carton = '/carton',
    anime = '/anime'
}

export function getTypeLink(type: BaseResponse) {
    switch (type.id) {
        case 1 : {
            return 'movie';
        }
        case 2: {
            return 'serial'
        }
        case 3: {
            return 'carton'
        }
        case 4: {
            return 'anime'
        }
        default: {
            return "404"
        }
    }
}
