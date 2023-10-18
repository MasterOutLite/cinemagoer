import {ApiProperty} from "@nestjs/swagger";
import Status from "@src/status/status.model";
import {IsOptional, IsString} from "class-validator";


export class CreateStatusDto {
    @ApiProperty({example: 'The box office', description: 'Status video.'})
    @IsString({message: 'Is not string'})
    readonly name: string;

    @ApiProperty({
        example: 'The film is in the box office',
        description: 'Description. Max length 255'
    })
    @IsString({message: 'Is not string'})
    @IsOptional()
    description: string;
}
