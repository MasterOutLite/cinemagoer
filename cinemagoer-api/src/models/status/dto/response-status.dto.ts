import {ApiProperty} from "@nestjs/swagger";
import Status from "@models/status/status.entity";


export class ResponseStatusDto {
    constructor(value: Status, withoutDesc = false) {
        if (value) {
            this.id = value.id;
            this.name = value.name;
            if (!withoutDesc)
            this.description = value.description;
        }
    }

    @ApiProperty({example: '1', description: 'ID'})
    readonly id: number;

    @ApiProperty({example: 'The box office', description: 'Status video.'})
    readonly name: string;

    @ApiProperty({
        example: 'The film is in the box office',
        description: 'Description.',
        required: false
    })
    description?: string;
}
