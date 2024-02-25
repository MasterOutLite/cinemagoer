import {ApiProperty} from "@nestjs/swagger";
import Genre from "@models/genre/genre.entity";


export class ResponseGenreDto {
    constructor(value: Genre, withoutDesc = false) {
        if (value) {
            this.id = value.id;
            this.name = value.name;
            if (!withoutDesc)
                this.description = value.description;
        }
    }

    @ApiProperty({example: '1', description: 'ID'})
    readonly id: number;

    @ApiProperty({example: 'Romantic', description: 'Genre'})
    readonly name: string;

    @ApiProperty({
        example: 'Is a literary work with a focus on romantic relationships and emotions. Such novels often include love stories, relationships between the main characters, and other aspects of romance.',
        description: 'Description.',
        required: false,
    })
    description?: string;
}
