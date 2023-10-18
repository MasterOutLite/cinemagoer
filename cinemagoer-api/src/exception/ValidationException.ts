import {HttpException, HttpStatus} from "@nestjs/common";

export class ValidationException extends HttpException {
    message;

    constructor(message) {
        const response = {
            message: message,
            error: "Validation exception. Field: value",
            status: HttpStatus.BAD_REQUEST,
        }

        super(response, HttpStatus.BAD_REQUEST);
        this.message = message;
    }

}
