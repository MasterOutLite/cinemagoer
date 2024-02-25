import {ApiProperty} from "@nestjs/swagger";
import Publisher from "@models/publisher/publisher.entity";


export class ResponsePublisherDto {
    constructor(value: Publisher, withoutDesc = false) {
        if (value) {
            this.id = value.id;
            this.name = value.name;
            if (!withoutDesc)
                this.description = value.description;
        }
    }

    @ApiProperty({example: '1', description: 'ID'})
    readonly id: number;

    @ApiProperty({example: 'The Walt Disney Company', description: 'Who owner.'})
    readonly name: string;

    @ApiProperty({
        example: 'Is an American multinational mass media and entertainment conglomerate.',
        description: 'Description.',
        required: false
    })
    description?: string;
}
