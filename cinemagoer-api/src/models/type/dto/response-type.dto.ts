import {ApiProperty} from "@nestjs/swagger";
import Type from "@models/type/type.entity";


export class ResponseTypeDto {
    constructor(type: Type, withoutDesc = false) {
        if (type) {
            this.id = type.id;
            this.name = type.name;
            if (!withoutDesc)
                this.description = type.description;
        }
    }


    @ApiProperty({example: '1', description: 'ID'})
    readonly id: number;

    @ApiProperty({example: 'Movie', description: 'Name type'})
    readonly name: string;

    @ApiProperty({
        example: 'Is a work of visual art that simulates experiences and otherwise communicates ideas, stories, perceptions, feelings, beauty, or atmosphere through the use of moving images. These images are generally accompanied by sound and, more rarely, other sensory stimulations.',
        description: 'Description.',
        required: false
    })
    description?: string;
}
