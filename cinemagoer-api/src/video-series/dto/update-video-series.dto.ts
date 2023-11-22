import {ApiProperty} from "@nestjs/swagger";
import {IsBoolean, IsDate, IsNumberString, IsOptional, IsString} from "class-validator";

export class UpdateVideoSeriesDto {

    @ApiProperty({example: '1', description: 'ID VideoSeries'})
    @IsNumberString({}, {message: 'Is not number.'})
    id: number;

    @ApiProperty({example: '1', description: 'Day when be show series.'})
    @IsNumberString({}, {message: 'Is not number.'})
    readonly dayShowId: number;

    @ApiProperty({example: '1', description: 'Number series'})
    @IsNumberString({}, {message: 'Is not number.'})
    @IsOptional()
    series: number;

    @ApiProperty({example: 'Again hi!', description: 'Name series'})
    @IsString({message: 'Is not string.'})
    @IsOptional()
    name: string;

    @ApiProperty({example: '20.09.2023', description: 'Data release', format: 'Date'})
    @IsDate({message: 'Is not date.'})
    @IsOptional()
    dateRelease: Date;

    @ApiProperty({example: 'false', description: 'Release: yes or no'})
    @IsBoolean({message: 'Is not bool.'})
    @IsOptional()
    release: boolean;
}
