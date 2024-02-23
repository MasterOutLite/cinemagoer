import {Injectable} from "@nestjs/common";
import {Command} from "nestjs-command";
import {SeedService} from "@src/seed/seed.service";

@Injectable()
export class CommandSeed {
    constructor(private seedService: SeedService) {
    }

    @Command({
        command: 'seed:all',
        describe: 'Seed create all',
    })
    async seedCreateAll() {
        await this.seedService.createSeed();
    }

    @Command({
        command: 'seed:all:upsert',
        describe: 'Seed create or update all',
    })
    async seedUpsertAll() {
        await this.seedService.upsertSeed();
    }

    @Command({
        command: 'seed:video',
        describe: 'Create type.',
    })
    async createSeedType() {
        await this.seedService.createSeedVideo();
    }

}
