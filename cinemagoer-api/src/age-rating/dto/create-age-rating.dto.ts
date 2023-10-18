import {ApiProperty} from "@nestjs/swagger";
import AgeRating from "@src/age-rating/age-rating.model";
import {IsOptional, IsString, Length} from "class-validator";


export class CreateAgeRatingDto {
    @ApiProperty({example: 'PG-13', description: 'Age rating'})
    @IsString({message: 'Is not string'})
    readonly name: string;

    @ApiProperty({
        example: 'Some material may be inappropriate for children under 13.',
        description: 'Description. Max length 255'
    })
    @IsString({message: 'Is not string'})
    @IsOptional()
    description: string;
}
