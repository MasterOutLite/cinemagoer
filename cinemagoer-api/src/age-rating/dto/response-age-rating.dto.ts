import {ApiProperty} from "@nestjs/swagger";
import AgeRating from "@src/age-rating/age-rating.model";


export class ResponseAgeRatingDto {
    constructor({id, name, description}: AgeRating) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    @ApiProperty({example: '1', description: 'ID'})
    readonly id: number;

    @ApiProperty({example: 'PG-13', description: 'Age rating'})
    readonly name: string;

    @ApiProperty({
        example: 'Some material may be inappropriate for children under 13.',
        description: 'Description.'
    })
    description: string;
}
