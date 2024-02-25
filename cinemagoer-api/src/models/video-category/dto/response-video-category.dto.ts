import {ApiProperty} from "@nestjs/swagger";
import VideoCategory from "@models/video-category/video-category.entity";


export class ResponseVideoCategoryDto {
    constructor(value: VideoCategory, withoutDesc = false) {
        if (value) {
            this.id = value.id;
            this.name = value.name;
            if (!withoutDesc)
                this.description = value.description;
        }
    }

    @ApiProperty({example: '1', description: 'ID'})
    readonly id: number;

    @ApiProperty({example: 'Carton', description: 'Type category video'})
    readonly name: string;

    @ApiProperty({
        example: 'A cartoon is a type of visual art that is typically drawn, frequently animated, in an unrealistic or semi-realistic style.',
        description: 'Description.',
        required: false
    })
    description?: string;
}
