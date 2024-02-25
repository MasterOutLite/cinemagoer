import {Injectable} from '@nestjs/common';
import UserListView from "@models/user-list-view/user-list-view.entity";
import {InjectRepository} from "@nestjs/typeorm";
import ListView from "@models/list-view/list-view.entity";
import {Repository} from "typeorm";
import Video from "@models/video/video.entity";
import {CreateUserListViewDto} from "@models/user-list-view/dto/create-user-list-view.dto";
import {CreateListViewDto} from "@models/user-list-view/dto/create-list-view.dto";
import {TokenFormat} from "@src/auth/dto/TokenFormat";
import {CheckExists} from "@src/exception/CheckExists";
import {ResponseListViewDto} from "@models/user-list-view/dto/response-list-view.dto";
import {StateAction} from "@models/user-list-view/dto/state-action";
import {GetUserListViewQuery} from "@models/user-list-view/query/get-user-list-view.query";
import {ResponseVideoFromListView} from "@models/user-list-view/dto/response-user-list-view.dto";

@Injectable()
export class UserListViewService {
    constructor(
        @InjectRepository(UserListView)
        private userListViewRepository: Repository<UserListView>,
        @InjectRepository(ListView)
        private listViewRepository: Repository<ListView>,
        @InjectRepository(Video)
        private videoRepository: Repository<Video>,
    ) {
    }

    async create(dto: CreateUserListViewDto) {
        return await this.userListViewRepository.save(dto);
    }

    async add(dto: CreateListViewDto, auth: TokenFormat) {
        const check: CheckExists = new CheckExists();
        check.add({
            tag: 'userListViewId',
            //{where: {id, userId}} dto.userListViewId, auth.id
            exists: await this.existsOwnUser(dto.userListViewId, auth.id)
        });
        check.add({
            tag: 'videoId',
            exists: await this.videoRepository.exists({where: {id: dto.videoId}})
        });
        check.checkAndThrow();

        let response: ResponseListViewDto;

        const existsWherever = await this.listViewRepository.findOne({
            where: {
                videoId: dto.videoId,
                userListView: {
                    userId: auth.id
                }
            },
            relations: {
                userListView: true
            }
            //include: [{model: UserListView, where: {userId: auth.id}}]
        })

        console.log('userListViewId')
        console.log(dto.userListViewId)
        console.log()
        console.log(existsWherever)

        if (!existsWherever) {
            //create
            const listView = await this.listViewRepository.save(dto);
            response = new ResponseListViewDto(listView, dto.add, StateAction.CREATE)
        } else if (existsWherever.userListViewId == dto.userListViewId || !dto.add) {
            //remove
            await this.listViewRepository.delete(existsWherever.id);
            response = new ResponseListViewDto(existsWherever, false, StateAction.REMOVE);
        } else {
            //change userListViewId
            existsWherever.userListViewId = dto.userListViewId;
            await this.listViewRepository.update(existsWherever.id, existsWherever)
            response = new ResponseListViewDto(existsWherever, true, StateAction.CHANGE);
        }

        return response;
    }

    async getAll(query: GetUserListViewQuery) {
        return await this.userListViewRepository.find({where: {userId: query.userId}});
    }

    async getAllWithVideo(query: GetUserListViewQuery) {
        const userListView = await this.getAll(query);

        for (const list of userListView) {
            const listViews = await this.listViewRepository.find({
                where: {userListViewId: list.id},
                relations: {
                    video: true
                }
                //include: [{model: Video}]
            });

            // @ts-ignore
            list.video = [];
            for (const video of listViews) {
                // @ts-ignore
                list.video.push(new ResponseVideoFromListView(video.video))
            }
        }

        return userListView;

    }

    async getListViewWhereVideo(videoId: number, userId: number) {
        const listView = await this.listViewRepository.findOne({
            where: {
                videoId,
                userListView: {
                    userId
                }
            },
            relations: {
                userListView: true
            }
            // include: [{model: UserListView, where: {userId}}]
        });

        //console.log({...listView?.dataValues, notFound: !listView});
        return {listView, notFound: !listView}
    }


    async existsOwnUser(id: number, userId: number): Promise<boolean> {
        const list = await this.userListViewRepository.findOne({where: {id, userId}})
        return list !== null;
    }
}
