import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString} from "class-validator";
import {Transform} from "class-transformer";

export class CreateVideoInfoDto {
   // @ApiProperty({example: '1', description: 'ID video.'})
    @IsNumberString()
    @IsOptional()
    videoId: number;

    @ApiProperty({example: 'Its video is ...', description: 'Description'})
    @IsString()
    description: string;

    @ApiProperty({example: ["Loid", "Goru"], description: 'Main Characters'})
    @Transform(({value}) => (Array.isArray(value) ? value : value.split(',')))
    mainCharacters: string[];

    @ApiProperty({type: 'string',description: 'Trailers files', format: 'binary', required: false})
    trailers: string[];

    @ApiProperty({example: '12', description: 'Count series'})
    @IsNumberString({},{message:'Is not number'})
    countSeries: number;

    @ApiProperty({type: 'string', description: 'Pictures files', format: 'binary', required: false})
    pictures: string[];

    @ApiProperty({example: '~23m', description: 'Duration one video'})
    @IsString()
    duration: string;
}
