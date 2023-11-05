import Video from "@src/video/video.model";
import {ApiProperty} from "@nestjs/swagger";
import {ResponseAgeRatingDto} from "@src/age-rating/dto/response-age-rating.dto";
import {ResponsePublisherDto} from "@src/publisher/dto/response-publisher.dto";
import {ResponseVideoCategoryDto} from "@src/video-category/dto/response-video-category.dto";
import {ResponseStatusDto} from "@src/status/dto/response-status.dto";
import {ResponseTypeDto} from "@src/type/dto/response-type.dto";
import {ResponseGenreDto} from "@src/genre/dto/response-genre.dto";

export class ResponseVideoDto {
    constructor(video: Video, withoutDesc = true) {
        this.id = video.id;
        this.name = video.name;
        this.dateRelease = video.dateRelease;
        this.genre = video.genre.map(value => new ResponseGenreDto(value, withoutDesc));
        this.videoCategory = new ResponseVideoCategoryDto(video.videoCategory, withoutDesc);
        this.type = new ResponseTypeDto(video.type, withoutDesc);
        this.status = new ResponseStatusDto(video.status, withoutDesc);
        this.publisher = new ResponsePublisherDto(video.publisher, withoutDesc);
        this.ageRating = new ResponseAgeRatingDto(video.ageRating, withoutDesc);
        this.icon = video.icon;

        // @ts-ignore
        this.rate = video.getDataValue('avgRate') || null;
        // @ts-ignore
        this.yourRate = video.getDataValue('yourRate') || undefined;
    }

    @ApiProperty({example: '1', description: 'Id video.'})
    id: number;

    @ApiProperty({example: '6.3', description: 'Video rate'})
    rate?: number;

    @ApiProperty({example: '6.3', description: 'Your video rate'})
    yourRate?: number;

    @ApiProperty({example: '["Wolf", "Вовк"]', description: 'Name video.'})
    name: string[];

    @ApiProperty({example: '20.09.2023', description: 'Email unique user.'})
    dateRelease: Date;

    @ApiProperty({example: [{id: 1, name: 'Roman'}, {id: 1, name: 'Fight'}], description: 'Genre (Roman, Fight, ...).'})
    genre: ResponseGenreDto[];

    @ApiProperty({example: {id: 1, name: 'Film'}, description: 'Type video (Film, Serial, ...).'})
    type: ResponseTypeDto;

    @ApiProperty({example: {id: 1, name: 'Release'}, description: 'Status video (Release, Waiting, ...).'})
    status: ResponseStatusDto;

    @ApiProperty({example: {id: 1, name: 'Cartoon'}, description: 'Video category (Film, Cartoon, ...).'})
    videoCategory: ResponseVideoCategoryDto;

    @ApiProperty({example: {id: 1, name: 'Sony'}, description: 'Publisher name (The Walt Disney Company, Pixar, ...).'})
    publisher: ResponsePublisherDto;

    @ApiProperty({example: {id: 1, name: 'PG-13'}, description: 'Age rating (18+, 16+, PG-13, ...).'})
    ageRating: ResponseAgeRatingDto;

    @ApiProperty({example: 'icon/bfb73574-64dc-4fb6-97a7-9dfe9ac4aa5f.jpg4', description: 'Icon video.'})
    icon: string;
}
