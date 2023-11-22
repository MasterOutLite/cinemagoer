import {ApiProperty} from "@nestjs/swagger";
import {IsNumberString} from "class-validator";

export class CreateDubbingOfVideoDto{
    @ApiProperty({example: 1, description:'Dubbing studios'})
    @IsNumberString()
    dubbingStudioId: number;

    @ApiProperty({example: 1, description:'Video Series'})
    @IsNumberString()
    videoSeriesId: number;

    @ApiProperty({example: 1, description:'Dubbing studios', type: 'binary'})
    video: string;
}
