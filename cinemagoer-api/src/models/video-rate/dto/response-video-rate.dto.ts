import {ApiProperty} from "@nestjs/swagger";
import VideoRate from "@models/video-rate/video-rate.entity";

export class ResponseVideoRateDto {
    constructor(entity: VideoRate) {
        this.id = entity.id;
        this.videoId = entity.videoId;
        this.userId = entity.userId;
        this.rate = entity.rate;
    }

    @ApiProperty({example: 1, description: 'Id video for rate'})
    id: number;

    @ApiProperty({example: 1, description: 'Id video for rate'})
    videoId: number;

    @ApiProperty({example: 1, description: 'Id video for rate'})
    userId: number;

    @ApiProperty({example: 10, description: 'Rate video you set'})
    rate: number;
}
