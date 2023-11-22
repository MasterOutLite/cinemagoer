import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsDate, IsNumberString, IsOptional, IsString} from "class-validator";
import {Transform} from "class-transformer";

export class FilterVideoQuery {

    @ApiProperty({example: 1, description: 'Page', required: true})
    @IsNumberString()
    page: number;

    @ApiProperty({example: 10, description: 'Limit', required: false})
    @IsNumberString()
    @IsOptional()
    limit: number;

    // @ApiProperty({example: 'data/asc', description: 'String what will be search.', required: false})
    // @IsString()
    // @IsOptional()
    // orderBy: string;

    @ApiProperty({example: '2023-9-23', description: 'Date release min', format: 'date', required: false})
    @IsDate({message: 'Is not date'})
    @Transform(({value}) => (new Date(value)))
    @IsOptional()
    dateReleaseMin: Date;

    @ApiProperty({example: '2023-12-23', description: 'Date release max', format: 'date', required: false})
    @IsDate({message: 'Is not date'})
    @Transform(({value}) => (new Date(value)))
    @IsOptional()
    dateReleaseMax: Date;

    @ApiProperty({example: '1', description: 'Season of year (Winter, Spring, Summer, Autumn).', required: false})
    @IsNumberString({}, {message: 'Is not number'})
    @IsOptional()
    seasonOfYearId?: number;

    @ApiProperty({example: [1, 6, 7], type: [Number], description: 'Genre (Roman, Fight, ...).', required: false})
    @IsArray({message: 'Is not arr'})
    @IsOptional()
    @Transform(({value}) => (Array.isArray(value) ? value : value.split(',')))
    genreIds: number[];

    @ApiProperty({example: '1', description: 'Type video (Film, Serial, ...).', required: false})
    @IsNumberString({}, {message: 'Is not number'})
    @IsOptional()
    typeId: number;

    @ApiProperty({example: '1', description: 'Status video (Release, Waiting, ...).', required: false})
    @IsNumberString({}, {message: 'Is not number'})
    @IsOptional()
    statusId: number;

    @ApiProperty({example: '1', description: 'Video category (Film, Cartoon, ...).', required: false})
    @IsNumberString({}, {message: 'Is not number'})
    @IsOptional()
    videoCategoryId: number;

    @ApiProperty({example: '1', description: 'Publisher name (The Walt Disney Company, Pixar, ...).', required: false})
    @IsNumberString({}, {message: 'Is not number'})
    @IsOptional()
    publisherId: number;

    @ApiProperty({example: '1', description: 'Age rating (18+, 16+, PG-13, ...).', required: false})
    @IsNumberString({}, {message: 'Is not number'})
    @IsOptional()
    ageRatingId: number;
}
