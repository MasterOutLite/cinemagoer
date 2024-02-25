import {ApiProperty} from "@nestjs/swagger";
import {ResponseVideoDto} from "@models/video/dto/response-video.dto";

export class ResponseCountVideoDto {

    constructor(count: number, page: number, rows: ResponseVideoDto[]) {
        this.page = page;
        this.count = count;
        this.rows = rows;
    }

    @ApiProperty({example: 1, description: 'Count'})
    readonly count: number;

    @ApiProperty({example: 1, description: 'Page'})
    readonly page: number;

    @ApiProperty({
        example: [{
            video: {
                id: 1,
                name: [
                    "Wolf",
                    "Вовк"
                ],
                dateRelease: "20.09.2023",
                genre: [
                    {
                        "id": 1,
                        "name": "Roman"
                    },
                    {
                        "id": 1,
                        "name": "Fight"
                    }
                ],
                type: {
                    "id": 1,
                    "name": "Film"
                },
                status: {
                    "id": 1,
                    "name": "Release",
                },
                videoCategory: {
                    "id": 1,
                    "name": "Cartoon"
                },
                publisher: {
                    "id": 1,
                    "name": "Sony"
                },
                ageRating: {
                    "id": 1,
                    "name": "PG-13"
                },
                icon: "pictures/bfb73574-64dc-4fb6-97a7-9dfe9ac4aa5f.jpg4"
            },
        }], description: 'Count'
    })
    readonly rows: ResponseVideoDto[];

}
