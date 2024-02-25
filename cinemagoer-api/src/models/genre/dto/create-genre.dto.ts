import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString, Length} from "class-validator";


export class CreateGenreDto {
    @ApiProperty({example: 'Romantic', description: 'Genre'})
    @IsString({message: 'Is not string'})
    @Length(3, 255)
    readonly name: string;

    @ApiProperty({
        example: 'Is a literary work with a focus on romantic relationships and emotions. Such novels often include love stories, relationships between the main characters, and other aspects of romance.',
        description: 'Description.'
    })
    @IsString({message: 'Is not string'})
    @IsOptional()
    description: string;
}
