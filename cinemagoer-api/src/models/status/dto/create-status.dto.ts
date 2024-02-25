import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString, Length} from "class-validator";


export class CreateStatusDto {
    @ApiProperty({example: 'The box office', description: 'Status video.'})
    @IsString({message: 'Is not string'})
    @Length(3, 255)
    readonly name: string;

    @ApiProperty({
        example: 'The film is in the box office',
        description: 'Description.'
    })
    @IsString({message: 'Is not string'})
    @IsOptional()
    description: string;
}
