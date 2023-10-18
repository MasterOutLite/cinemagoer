import {IntersectionType} from "@nestjs/swagger";
import {CreateVideoInfoDto} from "@src/video-info/dto/create-video-info.dto";
import {CreateVideoDto} from "@src/video/dto/create-video.dto";

export class CreateVideoCombineDto extends IntersectionType(
    CreateVideoDto,
    CreateVideoInfoDto,
) {
}
