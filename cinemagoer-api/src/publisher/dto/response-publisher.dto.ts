import {ApiProperty} from "@nestjs/swagger";
import Publisher from "@src/publisher/publisher.model";


export class ResponsePublisherDto {
    constructor(value: Publisher) {
        if (value) {
            this.id = value.id;
            this.name = value.name;
            this.description = value.description;
        }
    }

    @ApiProperty({example: '1', description: 'ID'})
    readonly id: number;

    @ApiProperty({example: 'The Walt Disney Company', description: 'Who owner.'})
    readonly name: string;

    @ApiProperty({
        example: 'Is an American multinational mass media and entertainment conglomerate.',
        description: 'Description.'
    })
    description: string;
}
