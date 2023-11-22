import {ApiProperty} from "@nestjs/swagger";
import DubbingOfVideo from "@src/dubbing-of-video/dubbing-of-video.model";

export class ResponseDubbingOfVideoDto {
    constructor(entity: DubbingOfVideo) {
        this.id = entity.id;
        this.video = entity.video;
        this.dubbingStudioId = entity.dubbingStudioId;
        this.videoSeriesId = entity.videoSeriesId;
    }

    @ApiProperty({example: 1, description: 'Dubbing studios'})
    id: number;

    @ApiProperty({example: 1, description: 'Dubbing studios'})
    dubbingStudioId: number;

    @ApiProperty({example: 1, description: 'Video Series'})
    videoSeriesId: number;

    @ApiProperty({example: 1, description: 'Dubbing studios',})
    video: string;
}
