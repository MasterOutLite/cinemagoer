import {ArgumentMetadata, PipeTransform} from "@nestjs/common";
import {plainToClass, } from "class-transformer";
import {validate} from "class-validator";
import {ValidationException} from "@src/exception/ValidationException";
import e from "express";

export class ValidationPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj = plainToClass(metadata.metatype, value);
        const error = await validate(obj);


        if (error.length) {
            console.log(error[0])

            let messages = error.map(value => (
                `${value.property}: ${value.value}. Type value ${typeof value.target}.`
            ))
            throw new ValidationException(messages);
        }

        return value;
    }
}
