import {HttpException, HttpStatus} from "@nestjs/common";

export class ExistsException extends HttpException{
    constructor(message?: any) {
        const response = {
            message: message || "Exists element!",
            error: 'Bad request. Attribute is exists',
            status: HttpStatus.BAD_REQUEST,
        }
        super(response, HttpStatus.BAD_REQUEST);
    }
}
