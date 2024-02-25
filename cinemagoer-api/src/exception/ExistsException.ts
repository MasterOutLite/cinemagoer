import {BadRequestException, HttpException, HttpStatus} from "@nestjs/common";

export class ExistsException extends BadRequestException {
    constructor(message?: any) {
        const response = {
            message: message || "Exists element!",
            error: 'Bad request. Attribute is exists',
            status: HttpStatus.BAD_REQUEST,
        }
        super(response);
    }
}
