import {Module} from '@nestjs/common';
import {DubbingStudioService} from './dubbing-studio.service';
import {DubbingStudioController} from './dubbing-studio.controller';
import {AuthModule} from "@src/auth/auth.module";
import DubbingStudio from "@models/dubbing-studio/dubbing-studio.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    providers: [DubbingStudioService],
    imports: [
        TypeOrmModule.forFeature([DubbingStudio]),
        AuthModule
    ],
    controllers: [DubbingStudioController],
    exports: [DubbingStudioService]
})
export class DubbingStudioModule {
}
