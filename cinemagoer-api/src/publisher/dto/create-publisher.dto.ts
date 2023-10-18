import {ApiProperty} from "@nestjs/swagger";
import Publisher from "@src/publisher/publisher.model";
import {IsOptional, IsString} from "class-validator";


export class CreatePublisherDto {
    @ApiProperty({example: 'The Walt Disney Company', description: 'Who owner.'})
    @IsString({message: 'Is not string'})
    readonly name: string;

    @ApiProperty({
        example: 'Is an American multinational mass media and entertainment conglomerate.',
        description: 'Description. Max length 255'
    })
    @IsString({message: 'Is not string'})
    @IsOptional()
    description: string;
}
