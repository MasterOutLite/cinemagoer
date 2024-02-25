import {Module} from '@nestjs/common';
import {PublisherController} from './publisher.controller';
import {PublisherService} from './publisher.service';
import {AuthModule} from "@src/auth/auth.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import Publisher from "@models/publisher/publisher.entity";

@Module({
    controllers: [PublisherController],
    providers: [PublisherService],
    imports: [
        TypeOrmModule.forFeature([Publisher]),
        AuthModule
    ],
    exports: [PublisherService]
})
export class PublisherModule {
}
