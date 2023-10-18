import {ApiProperty} from "@nestjs/swagger";
import Video from "@src/video/video.model";

export class ResponseVideoDto {
    constructor(video:Video) {
        this.name = video.name
        this.dateRelease = video.dateRelease;
        this.genreId = video.genre.map(value => value.id);
        this.videoCategoryId = video.videoCategoryId;
        this.typeId = video.typeId;
        this.statusId = video.statusId;
        this.publisherId = video.publisherId;
        this.ageRatingId = video.ageRatingId;
        this.icon = video.icon;
    }

    @ApiProperty({example: '["Wolf", "Вовк"]', description: 'Name video.'})
    name: string[];

    @ApiProperty({example: '20.09.2023', description: 'Email unique user.'})
    dateRelease: Date;

    @ApiProperty({example: '[1, 6 ,7]', description: 'Genre (Roman, Fight, ...).'})
    genreId: number[];

    @ApiProperty({example: '1', description: 'Type video (Film, Serial, ...).'})
    typeId: number;

    @ApiProperty({example: '1', description: 'Status video (Release, Waiting, ...).'})
    statusId: number;

    @ApiProperty({example: '1', description: 'Video category (Film, Cartoon, ...).'})
    videoCategoryId: number;

    @ApiProperty({example: '1', description: 'Publisher name (The Walt Disney Company, Pixar, ...).'})
    publisherId: number;

    @ApiProperty({example: '1', description: 'Age rating (18+, 16+, PG-13, ...).'})
    ageRatingId: number;

    @ApiProperty({example: 'icon/bfb73574-64dc-4fb6-97a7-9dfe9ac4aa5f.jpg4', description: 'Icon video.'})
    icon: string;
}
