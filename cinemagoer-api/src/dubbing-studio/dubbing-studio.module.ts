import {Module} from '@nestjs/common';
import {DubbingStudioService} from './dubbing-studio.service';
import {SequelizeModule} from "@nestjs/sequelize";
import DubbingStudio from "@src/dubbing-studio/dubbing-studio.model";

@Module({
    providers: [DubbingStudioService],
    imports: [
        SequelizeModule.forFeature([DubbingStudio]),
    ]
})
export class DubbingStudioModule {
}
