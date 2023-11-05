import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString, Length} from "class-validator";

export class UpdateUserDto {
    @ApiProperty({example: 'nicknameTon', description: 'nickname user', required: false})
    @IsString({message: 'String only'})
    @Length(4, 20, {message: 'min: 8 / max: 20'})
    @IsOptional()
    readonly nickname?: string;

    @ApiProperty({description: 'avatar files', format: 'binary', required: false})
    @IsOptional()
    readonly avatar?: string;
}
