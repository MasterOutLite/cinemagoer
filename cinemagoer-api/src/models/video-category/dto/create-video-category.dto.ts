import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString} from "class-validator";


export class CreateVideoCategoryDto {
    @ApiProperty({example: 'Carton', description: 'Type category video'})
    @IsString({message: 'Is not string'})
    readonly name: string;

    @ApiProperty({
        example: 'A cartoon is a type of visual art that is typically drawn, frequently animated, in an unrealistic or semi-realistic style.',
        description: 'Description. Max length 255'
    })
    @IsString({message: 'Is not string'})
    @IsOptional()
    description: string;
}
