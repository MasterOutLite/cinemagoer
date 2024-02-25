import {ApiProperty} from "@nestjs/swagger";
import {IsNumberString, IsOptional, IsString} from "class-validator";
import {Transform} from "class-transformer";

export class UpdateVideoInfoDto {

    @ApiProperty({example: '1', description: 'ID'})
    @IsNumberString()
    readonly id: number;

    @ApiProperty({example: 'Its video is ...', description: 'Description', required: false})
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({example: ["Loid", "Goru"], description: 'Main Characters', required: false})
    @Transform(({value}) => (Array.isArray(value) ? value : value.split(',')))
    @IsOptional()
    mainCharacters?: string[];

    @ApiProperty({description: 'Trailers files', format: 'binary', required: false})
    @IsOptional()
    trailers?: string[];

    @ApiProperty({example: '12', description: 'Count series', required: false})
    @IsNumberString({}, {message: 'Is not number'})
    @IsOptional()
    countSeries?: number;

    @ApiProperty({description: 'Pictures files', format: 'binary', required: false})
    @IsOptional()
    pictures?: string[];

    @ApiProperty({example: '~23m', description: 'Duration one video', required: false})
    @IsString()
    @IsOptional()
    duration?: string;
}
