import Video from "@models/video/video.entity";
import ResponseSeasonOfYearDto from "@models/video/dto/response-season-of-year.dto";
import {ResponseGenreDto} from "@models/genre/dto/response-genre.dto";
import {ResponseVideoCategoryDto} from "@models/video-category/dto/response-video-category.dto";
import {ResponseAgeRatingDto} from "@src/models/age-rating/dto/response-age-rating.dto";
import {ResponsePublisherDto} from "@src/models/publisher/dto/response-publisher.dto";
import {ResponseTypeDto} from "@models/type/dto/response-type.dto";
import {ResponseStatusDto} from "@models/status/dto/response-status.dto";
import {ApiProperty} from "@nestjs/swagger";

export class ResponseVideoDto {
    constructor(video: Video, withoutDesc = true) {
        this.id = video.id;
        this.name = video.name;
        this.dateRelease = video.dateRelease;
        this.seasonOfYear = new ResponseSeasonOfYearDto(video.seasonOfYear)
        this.genre = video.genre.map(value => new ResponseGenreDto(value, withoutDesc));
        this.videoCategory = new ResponseVideoCategoryDto(video.videoCategory, withoutDesc);
        this.type = new ResponseTypeDto(video.type, withoutDesc);
        this.status = new ResponseStatusDto(video.status, withoutDesc);
        this.publisher = new ResponsePublisherDto(video.publisher, withoutDesc);
        this.ageRating = new ResponseAgeRatingDto(video.ageRating, withoutDesc);
        this.icon = video.icon;
    }

    @ApiProperty({example: '1', description: 'Id video.'})
    id: number;

    @ApiProperty({example: '6.3', description: 'Video rate'})
    rate?: number;

    @ApiProperty({example: '6.3', description: 'Your video rate'})
    yourRate?: number;

    @ApiProperty({example: ["Wolf", "Вовк"], description: 'Name video.'})
    name: string[];

    @ApiProperty({type: Date, description: 'Email unique user.'})
    dateRelease: Date;

    @ApiProperty({type: ResponseTypeDto, isArray: true, description: 'Genre (Roman, Fight, ...).',})
    genre: ResponseGenreDto[];

    @ApiProperty({type: ResponseSeasonOfYearDto, description: 'Season of year (Winter, Spring, Summer, Autumn).'})
    seasonOfYear: ResponseSeasonOfYearDto;

    @ApiProperty({type: ResponseTypeDto, description: 'Type video (Film, Serial, ...).'})
    type: ResponseTypeDto;

    @ApiProperty({type: ResponseStatusDto, description: 'Status video (Release, Waiting, ...).'})
    status: ResponseStatusDto;

    @ApiProperty({type: ResponseVideoCategoryDto, description: 'Video category (Film, Cartoon, ...).'})
    videoCategory: ResponseVideoCategoryDto;

    @ApiProperty({type: ResponsePublisherDto, description: 'Publisher name (The Walt Disney Company, Pixar, ...).'})
    publisher: ResponsePublisherDto;

    @ApiProperty({type: ResponseAgeRatingDto, description: 'Age rating (18+, 16+, PG-13, ...).'})
    ageRating: ResponseAgeRatingDto;

    @ApiProperty({example: 'pictures/bfb73574-64dc-4fb6-97a7-9dfe9ac4aa5f.jpg4', description: 'Icon video.'})
    icon: string;
}
