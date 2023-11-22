import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsNumber, IsOptional} from "class-validator";

export class DubbingOfVideoQuery {

    @ApiProperty({example: 1, description: 'Id dubbing studio.'})
    @IsNumber()
    @IsOptional()
    dubbingStudioId?: number;

    @ApiProperty({example: [1, 2, 3], description: 'Array series what need.'})
    @IsNumber({}, {each: true})
    @IsOptional()
    videoSeriesIds?: number[];
}
