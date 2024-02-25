import {Injectable} from '@nestjs/common';
import ListView from "@models/list-view/list-view.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class ListViewService {
    constructor(
        @InjectRepository(ListView)
        private listViewRepository: Repository<ListView>,
    ) {
    }

    async getList(videoId: number, userId: number) {
        return await this.listViewRepository.findOne({
            where: {
                videoId,
                userListView: {
                    userId
                }
            },
            relations: {
                userListView: true
            }
            // include: [{model: UserListViewModel, where: {userId}}]
        })
    }

    // async getList(userListViewId: number) {
    //     return await this.listViewRepository.findAll({where: {userListViewId}, include: [{model: Video}]});
    // }

}
