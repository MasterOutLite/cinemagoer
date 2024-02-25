import {ApiProperty} from "@nestjs/swagger";
import VideoInfo from "@models/video-info/video-info.entity";

export class ResponseVideoInfoDto {
    constructor(type: VideoInfo) {
        if (type) {
            this.id = type.id;
            this.videoId = type.videoId;
            this.description = type.description;
            this.mainCharacters = type.mainCharacters;
            this.trailers = type.trailers;
            this.countSeries = type.countSeries;
            this.pictures = type.pictures;
            this.duration = type.duration;
        }
    }

    @ApiProperty({example: '1', description: 'ID'})
    readonly id: number;

    @ApiProperty({example: '1', description: 'ID video.'})
    readonly videoId: number;

    @ApiProperty({example: 'Its video is ...', description: 'Description'})
    description: string;

    @ApiProperty({example: '["Loid", "Goru"]', description: 'Main Characters'})
    mainCharacters: string[];

    @ApiProperty({
        example: ["video/bfb73574-64dc-4fb6-97a7-9dfe9ac4aa5f.jpg4"],
        description: 'Trailers files'
    })
    trailers: string[];

    @ApiProperty({example: '12', description: 'Count series'})
    countSeries: number;

    @ApiProperty({example: ["video/bfb73574-64dc-4fb6-97a7-9dfe9ac4aa5f.png"], description: 'Pictures files'})
    pictures: string[];

    @ApiProperty({example: '~23m', description: 'Duration one video'})
    duration: string;
}
