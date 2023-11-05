import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, Length, Max, Min,} from "class-validator";

export class CreateVideoRateDto {
    @ApiProperty({example: 1, description: 'Id video for rate'})
    @IsNumber()
    videoId: number;

    @ApiProperty({example: 10, description: 'Rate video you set'})
    @IsNumber()
    @Max(10)
    @Min(1)
    rate: number;
}
