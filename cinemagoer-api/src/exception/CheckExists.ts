import {BadRequestException} from "@nestjs/common";

export class CheckExists {

    constructor() {
    }

    private existsAtr: {
        tag: string,
        exists: boolean
    }[] = [];

    public add(check: {
        tag: string,
        exists: boolean
    }) {
        this.existsAtr.push(check);
    }
    
    public checkAndThrow() {
        const wrongAtr = this.existsAtr.filter(value => !value.exists);
        if (wrongAtr.length > 0) {
            throw new BadRequestException(`Request param ${wrongAtr.map(value => value.tag)} is null or bad value!`);
        }
    }
}
