import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsNumberString, IsOptional, IsString, Length} from "class-validator";

export class UpdateSeasonDto{
    @ApiProperty({example: '1', description: 'ID season'})
    @IsNumber({}, {message: 'Is not number.'})
    readonly id: number;

    @ApiProperty({example: 'New quest', description: 'Name Season'})
    @IsString({message: 'Is not string'})
    @Length(3, 255)
    @IsOptional()
    readonly name: string;

    @ApiProperty({example: '1', description: 'Number season'})
    @IsNumber({},{message: 'Is not number'})
    @IsOptional()
    readonly number: number;
}
