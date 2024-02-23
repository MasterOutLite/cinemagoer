import {BaseResponse} from "@/type/base-response";

export enum Links {
    main = '/',
    movie = '/movie',
    serial = '/serial',
    carton = '/carton',
    anime = '/anime',
    user = '/user',
    admin = '/admin',
}

export function getTypeLink(type: BaseResponse) {
    return getTypeLinkById(type.id)
}

export function getTypeLinkById(id: number) {
    switch (id) {
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

export function validateEmail(email: string) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const re = /\S+@\S+\.\S+/;
    return emailPattern.test(email);
}
