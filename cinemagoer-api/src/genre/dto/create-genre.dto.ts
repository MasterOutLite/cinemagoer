import {ApiProperty} from "@nestjs/swagger";
import Genre from "@src/genre/genre.model";
import {IsOptional, IsString, Length} from "class-validator";


export class CreateGenreDto {
    @ApiProperty({example: 'Romantic', description: 'Genre'})
    @IsString({message: 'Is not string'})
    readonly name: string;

    @ApiProperty({
        example: 'Is a literary work with a focus on romantic relationships and emotions. Such novels often include love stories, relationships between the main characters, and other aspects of romance.',
        description: 'Description. Max length 255'
    })
    @IsString({message: 'Is not string'})
    @IsOptional()
    description: string;
}
