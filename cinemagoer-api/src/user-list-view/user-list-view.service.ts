import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import UserListView from "@src/user-list-view/user-list-view.model";
import {CreateUserListViewDto} from "@src/user-list-view/dto/create-user-list-view.dto";
import {ResponseUserListViewDto, ResponseVideoFromListView} from "@src/user-list-view/dto/response-user-list-view.dto";
import {GetUserListViewQuery} from "@src/user-list-view/query/get-user-list-view.query";
import {CreateListViewDto} from "@src/user-list-view/dto/create-list-view.dto";
import {TokenFormat} from "@src/auth/dto/TokenFormat";
import {CheckExists} from "@src/exception/CheckExists";
import {ResponseListViewDto} from "@src/user-list-view/dto/response-list-view.dto";
import ListView from "@src/list-view/list-view.model";
import {VideoService} from "@src/video/video.service";
import Video from "@src/video/video.model";
import {StateAction} from "@src/user-list-view/dto/state-action";

@Injectable()
export class UserListViewService {
    constructor(
        @InjectModel(UserListView)
        private userListViewRepository: typeof UserListView,
        @InjectModel(ListView)
        private listViewRepository: typeof ListView,
        private videoService: VideoService
    ) {
    }

    async create(dto: CreateUserListViewDto): Promise<ResponseUserListViewDto> {
        const listView = await this.userListViewRepository.create(dto);
        return new ResponseUserListViewDto(listView);
    }

    async add(dto: CreateListViewDto, auth: TokenFormat) {
        const check: CheckExists = new CheckExists();
        check.add({
            tag: 'userListViewId',
            exists: await this.existsOwnUser(dto.userListViewId, auth.id)
        });
        check.add({
            tag: 'videoId',
            exists: await this.videoService.exists(dto.videoId)
        });
        check.checkAndThrow();

        let response: ResponseListViewDto = null;

        const existsWherever = await this.listViewRepository.findOne({
            where: {videoId: dto.videoId},
            include: [{model: UserListView, where: {userId: auth.id}}]
        })

        console.log('userListViewId')
        console.log(dto.userListViewId)
        console.log()
        console.log(existsWherever)

        if (!existsWherever) {
            //create
            const listView = await this.listViewRepository.create(dto);
            response = new ResponseListViewDto(listView, dto.add, StateAction.CREATE)
        } else if (existsWherever.userListViewId == dto.userListViewId || !dto.add) {
            //remove
            await existsWherever.destroy();
            response = new ResponseListViewDto(existsWherever, false, StateAction.REMOVE);
        } else {
            //change userListViewId
            existsWherever.userListViewId = dto.userListViewId;
            await existsWherever.save();
            response = new ResponseListViewDto(existsWherever, true, StateAction.CHANGE);
        }

        return response;
    }

    async getAll(query: GetUserListViewQuery): Promise<ResponseUserListViewDto[]> {
        const listViews = await this.userListViewRepository.findAll({where: {userId: query.userId}})
        const responses: ResponseUserListViewDto[] = []
        for (const listView of listViews) {
            const response = new ResponseUserListViewDto(listView);
            responses.push(response);
        }

        return responses;
    }

    async getAllWithVideo(query: GetUserListViewQuery) {
        const userListView = await this.getAll(query);

        for (const list of userListView) {
            const listViews = await this.listViewRepository.findAll({
                where: {userListViewId: list.id},
                include: [{model: Video}]
            });
            list.video = [];
            for (const video of listViews) {
                list.video.push(new ResponseVideoFromListView(video.video))
            }
        }

        return userListView;

    }

    async getListViewWhereVideo(videoId: number, userId: number) {
        const listView = await this.listViewRepository.findOne({
            where: {videoId},
            include: [{model: UserListView, where: {userId}}]
        });

        console.log({...listView?.dataValues, notFound: !listView});
        return {...listView?.dataValues, notFound: !listView}
    }

    async exists(id: number): Promise<boolean> {
        const list = await this.userListViewRepository.findOne({where: {id}})
        return list !== null;
    }

    async existsOwnUser(id: number, userId: number): Promise<boolean> {
        const list = await this.userListViewRepository.findOne({where: {id, userId}})
        return list !== null;
    }
}
