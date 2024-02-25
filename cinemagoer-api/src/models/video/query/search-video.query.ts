import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsNumberString, IsOptional, IsString} from "class-validator";

export class SearchVideoQuery{

    @ApiProperty({example: 'Wo', description: 'String what will be search.'})
    @IsString()
    readonly name: string;

    @ApiProperty({example: 'Wo', description: 'String what will be search.'})
    @IsNumberString()
    readonly videoCategoryId: number;

    @ApiProperty({example: 1, description: 'Page'})
    readonly page: number;

    @ApiProperty({example: 10, description: 'Limit', required: false})
    @IsNumberString()
    @IsOptional()
    readonly limit?: number;

    // @ApiProperty({example: 'data/asc', description: 'String what will be search.', required: false})
    // @IsString()
    // @IsOptional()
    // readonly orderBy: string;
}
