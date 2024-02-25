import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString, Length} from "class-validator";


export class CreatePublisherDto {
    @ApiProperty({example: 'The Walt Disney Company', description: 'Who owner.'})
    @IsString({message: 'Is not string'})
    @Length(3, 255)
    readonly name: string;

    @ApiProperty({
        example: 'Is an American multinational mass media and entertainment conglomerate.',
        description: 'Description.'
    })
    @IsString({message: 'Is not string'})
    @IsOptional()
    description: string;
}
