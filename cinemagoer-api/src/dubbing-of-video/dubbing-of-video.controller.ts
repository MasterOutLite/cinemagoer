import {Controller, HttpStatus, Post, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common';
import {ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ResponseDubbingStudioDto} from "@src/dubbing-studio/dto/response-dubbing-studio.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {Roles} from "@src/auth/roles-auth.decorator";
import {RoleUser} from "@src/const/role";
import {RolesGuard} from "@src/auth/roles-guard";
import {CreateDubbingOfVideoDto} from "@src/dubbing-of-video/dto/create-dubbing-of-video.dto";
import {DubbingOfVideoService} from "@src/dubbing-of-video/dubbing-of-video.service";

@ApiTags('DubbingOfVideo')
@Controller('dubbing-of-video')
export class DubbingOfVideoController {
    constructor(private dubbingOfVideoService: DubbingOfVideoService) {
    }

    @ApiOperation({summary: 'Create'})
    @ApiBearerAuth('JWT')
    @ApiConsumes('multipart/form-data')
    @ApiResponse({status: HttpStatus.CREATED, type: ResponseDubbingStudioDto})
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'video', maxCount: 1},
    ]))
    @Roles(RoleUser.ADMIN)
    @UseGuards(RolesGuard)
    @Post()
    create(dto: CreateDubbingOfVideoDto, @UploadedFiles() files: {
        video: Express.Multer.File[],
    }) {
        return this.dubbingOfVideoService.create(dto, files.video);
    }
}
