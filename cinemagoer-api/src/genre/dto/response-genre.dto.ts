import {ApiProperty} from "@nestjs/swagger";
import Genre from "@src/genre/genre.model";


export class ResponseGenreDto {
    constructor(value: Genre) {
        if (value) {
            this.id = value.id;
            this.name = value.name;
            this.description = value.description;
        }
    }

    @ApiProperty({example: '1', description: 'ID'})
    readonly id: number;

    @ApiProperty({example: 'Romantic', description: 'Genre'})
    readonly name: string;

    @ApiProperty({
        example: 'Is a literary work with a focus on romantic relationships and emotions. Such novels often include love stories, relationships between the main characters, and other aspects of romance.',
        description: 'Description.'
    })
    description: string;
}
