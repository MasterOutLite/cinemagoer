import {BadRequestException, HttpStatus} from "@nestjs/common";

export class ValidationException extends BadRequestException {
    constructor(message) {
        const response = {
            message: message,
            error: "Validation exception. Field: value",
            status: HttpStatus.BAD_REQUEST,
        }

        super(response);
        this.message = message;
    }

}
