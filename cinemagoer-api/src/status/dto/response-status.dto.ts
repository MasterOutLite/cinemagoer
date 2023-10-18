import {ApiProperty} from "@nestjs/swagger";
import Status from "@src/status/status.model";


export class ResponseStatusDto {
    constructor(value: Status) {
        if (value) {
            this.id = value.id;
            this.name = value.name;
            this.description = value.description;
        }
    }

    @ApiProperty({example: '1', description: 'ID'})
    readonly id: number;

    @ApiProperty({example: 'The box office', description: 'Status video.'})
    readonly name: string;

    @ApiProperty({
        example: 'The film is in the box office',
        description: 'Description.'
    })
    description: string;
}
