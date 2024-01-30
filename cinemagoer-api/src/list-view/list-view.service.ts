import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import ListView from "@src/list-view/list-view.model";
import UserListViewModel from "@src/user-list-view/user-list-view.model";

@Injectable()
export class ListViewService {
    constructor(
        @InjectModel(ListView)
        private listViewRepository: typeof ListView,
    ) {
    }

    async getList(videoId: number, userId: number) {
        return await this.listViewRepository.findOne({
            where: {videoId},
            include: [{model: UserListViewModel, where: {userId}}]
        })
    }

    // async getList(userListViewId: number) {
    //     return await this.listViewRepository.findAll({where: {userListViewId}, include: [{model: Video}]});
    // }

}
