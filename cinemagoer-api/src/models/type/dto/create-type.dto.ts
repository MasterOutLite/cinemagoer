import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString, Length} from "class-validator";


export class CreateTypeDto {
    @ApiProperty({example: 'Movie', description: 'Name type'})
    @IsString({message: 'Is not string'})
    @Length(3, 255)
    readonly name: string;

    @ApiProperty({
        example: 'Is a work of visual art that simulates experiences and otherwise communicates ideas, stories, perceptions, feelings, beauty, or atmosphere through the use of moving images. These images are generally accompanied by sound and, more rarely, other sensory stimulations.',
        description: 'Description.'
    })
    @IsString({message: 'Is not string'})
    @IsOptional()
    description: string;
}
