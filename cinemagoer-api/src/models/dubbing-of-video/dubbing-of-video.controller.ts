import {Controller, HttpStatus, Post, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common';
import {ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {Roles} from "@src/guard/roles.decorator";
import {RoleUser} from "@src/const/role";
import {RoleGuard} from "@src/guard/role-guard.service";
import {DubbingOfVideoService} from "@models/dubbing-of-video/dubbing-of-video.service";
import {ResponseDubbingStudioDto} from "@models/dubbing-studio/dto/response-dubbing-studio.dto";
import {CreateDubbingOfVideoDto} from "@models/dubbing-of-video/dto/create-dubbing-of-video.dto";

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
    @UseGuards(RoleGuard)
    @Post()
    create(dto: CreateDubbingOfVideoDto, @UploadedFiles() files: {
        video: Express.Multer.File[],
    }) {
        return this.dubbingOfVideoService.create(dto, files.video);
    }
}
