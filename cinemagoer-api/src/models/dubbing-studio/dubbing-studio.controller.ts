import {Controller, Get, HttpStatus, Post, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "@src/guard/roles.decorator";
import {RoleUser} from "@src/const/role";
import {RoleGuard} from "@src/guard/role-guard.service";
import {DubbingStudioService} from "@models/dubbing-studio/dubbing-studio.service";
import {ResponseDubbingStudioDto} from "@models/dubbing-studio/dto/response-dubbing-studio.dto";
import {CreateDubbingStudioDto} from "@models/dubbing-studio/dto/create-dubbing-studio.dto";

@ApiTags('DubbingStudio')
@Controller('dubbing-studio')
export class DubbingStudioController {

    constructor(
        private dubbingStudioService: DubbingStudioService
    ) {
    }

    @ApiOperation({summary: 'Create'})
    @ApiBearerAuth('JWT')
    @ApiResponse({status: HttpStatus.CREATED, type: ResponseDubbingStudioDto})
    @Roles(RoleUser.ADMIN)
    @UseGuards(RoleGuard)
    @Post()
    create(dto: CreateDubbingStudioDto) {
        return this.dubbingStudioService.create(dto);
    }

    @ApiOperation({summary: 'Get all'})
    @ApiResponse({status: HttpStatus.OK, type: [ResponseDubbingStudioDto]})
    @Get()
    getAll() {
        return this.dubbingStudioService.getAll();
    }
}
