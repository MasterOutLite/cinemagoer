import {Module} from '@nestjs/common';
import {DubbingStudioService} from './dubbing-studio.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {DubbingStudioController} from './dubbing-studio.controller';
import DubbingStudio from "@src/dubbing-studio/dubbing-studio.model";
import {AuthModule} from "@src/auth/auth.module";

@Module({
    providers: [DubbingStudioService],
    imports: [
        SequelizeModule.forFeature([DubbingStudio]),
        AuthModule
    ],
    controllers: [DubbingStudioController],
    exports: [DubbingStudioService]
})
export class DubbingStudioModule {
}
