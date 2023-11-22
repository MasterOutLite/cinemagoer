import {Injectable} from '@nestjs/common';

@Injectable()
export class ListViewService {
    // constructor(
    //     @InjectModel(ListView)
    //     private listViewRepository: typeof ListView,
    //     private videoService: VideoService,
    //     private userListViewService: UserListViewService
    // ) {
    // }
    //
    // async add(dto: CreateListViewDto, auth: TokenFormat) {
    //     const check: CheckExists = new CheckExists();
    //     check.add({
    //         tag: 'userListViewId',
    //         exists: await this.userListViewService.existsOwnUser(dto.userListViewId, auth.id)
    //     });
    //     check.add({
    //         tag: 'videoId',
    //         exists: await this.videoService.exists(dto.videoId)
    //     });
    //     check.checkAndThrow();
    //
    //     let response: ResponseListViewDto = null;
    //
    //     const exists = await this.listViewRepository.findOne({
    //         where: {
    //             videoId: dto.videoId,
    //             userListViewId: dto.userListViewId
    //         }
    //     })
    //
    //     if (dto.add && !exists) {
    //         const listView = await this.listViewRepository.create(dto);
    //         response = new ResponseListViewDto(listView, dto.add)
    //     } else {
    //         const listView = await exists.destroy();
    //         response = new ResponseListViewDto(exists, dto.add);
    //     }
    //
    //     return response;
    // }
    //
    // async getList(userListViewId: number) {
    //     return await this.listViewRepository.findAll({where: {userListViewId}, include: [{model: Video}]});
    // }

}
