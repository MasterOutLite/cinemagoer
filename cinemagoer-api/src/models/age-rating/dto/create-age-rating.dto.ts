import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString, Length} from "class-validator";


export class CreateAgeRatingDto {
    @ApiProperty({example: 'PG-13', description: 'Age rating'})
    @IsString({message: 'Is not string'})
    @Length(2, 255)
    readonly name: string;

    @ApiProperty({
        example: 'Some material may be inappropriate for children under 13.',
        description: 'Description.'
    })
    @IsString({message: 'Is not string'})
    @IsOptional()
    description: string;
}
