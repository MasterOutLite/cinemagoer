import {IsArray, IsDate, IsNumberString, IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Transform} from "class-transformer";

export class UpdateVideoDto {
    @ApiProperty({example: '1', description: 'Id video.'})
    @IsNumberString()
    id: number;

    @IsArray({message: 'Is not array',})
    @ApiProperty({
        description: 'Name video.',
        example: ["Wolf", "Вовк"],
        required: false
    },)
    @Transform(({value}) => (Array.isArray(value) ? value : value.split(',')))
    @IsOptional()
    name?: string[];

    @ApiProperty({example: 'Icon file', description: 'Icon file (png, jpeg).', format: 'binary', required: false})
    @IsOptional()
    icon?: string;

    @ApiProperty({example: '2023-9-23', description: 'Date release', format: 'date', required: false})
    @IsDate({message: 'Is not date'})
    @Transform(({value}) => (new Date(value)))
    @IsOptional()
    dateRelease?: Date;

    @ApiProperty({example: [1, 6, 7], type: [Number], description: 'Genre (Roman, Fight, ...).', required: false})
    @IsArray({message: 'Is not arr'})
    @Transform(({value}) => (Array.isArray(value) ? value : value.split(',')))
    @IsOptional()
    genreIds?: number[];


    @ApiProperty({example: '1', description: 'Type video (Film, Serial, ...).', required: false})
    @IsNumberString({}, {message: 'Is not number'})
    @IsOptional()
    typeId?: number;

    @ApiProperty({example: '1', description: 'Status video (Release, Waiting, ...).', required: false})
    @IsNumberString({}, {message: 'Is not number'})
    @IsOptional()
    statusId?: number;

    @ApiProperty({example: '1', description: 'Video category (Film, Cartoon, ...).', required: false})
    @IsNumberString({}, {message: 'Is not number'})
    @IsOptional()
    videoCategoryId?: number;

    @ApiProperty({example: '1', description: 'Publisher name (The Walt Disney Company, Pixar, ...).', required: false})
    @IsNumberString({}, {message: 'Is not number'})
    @IsOptional()
    publisherId?: number;

    @ApiProperty({example: '1', description: 'Age rating (18+, 16+, PG-13, ...).', required: false})
    @IsNumberString({}, {message: 'Is not number'})
    @IsOptional()
    ageRatingId?: number;

    @ApiProperty({example: '1', description: 'Group relation', required: false})
    @IsNumberString({}, {message: 'Is not number'})
    @IsOptional()
    groupId?: number;
}
