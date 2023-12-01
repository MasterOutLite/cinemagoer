import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import Type from "@src/type/type.model";
import Role from "@role/role.model";
import {roles, RoleUser} from "@src/const/role";
import {types} from "@src/const/type";
import {ageRatings} from "@src/const/age-ratings";
import AgeRating from "@src/age-rating/age-rating.model";
import VideoCategory from "@src/video-category/video-category.model";
import {videoCategorys} from "@src/const/video-category";
import Status from "@src/status/status.model";
import {statuses} from "@src/const/status";
import Publisher from "@src/publisher/publisher.model";
import {publishers} from "@src/const/publishers";
import Genre from "@src/genre/genre.model";
import {genres} from "@src/const/genre";
import {UsersService} from "@users/users.service";
import {admins, users} from "@src/const/user";
import {anime, movie, serials} from "@src/const/video";
import {FilesService} from "@src/files/files.service";
import {VideoService} from "@src/video/video.service";
import {listStates} from "@src/const/list-state";
import ListViewState from "@src/list-view-state/list-view-state.model";
import {AuthService} from "@src/auth/auth.service";
import {VideoSeriesService} from "@src/video-series/video-series.service";
import DayOfWeek from "@src/video-series/day-of-week.model";
import {dayOfWeekList} from "@src/const/day-of-week-list";
import SeasonOfYear from "@src/video/season-of-year.model";
import {seasonOfYearList} from "@src/const/season-of-year-list";
import Comments from "@src/comments/comments.model";
import {faker} from "@faker-js/faker/locale/uk";
import CommentsRate from "@src/comments-rate/comments-rate.model";
import VideoRate from "@src/video-rate/video-rate.model";

@Injectable()
export class SeedService {
    constructor(
        @InjectModel(Type)
        private type: typeof Type,
        @InjectModel(Role)
        private role: typeof Role,
        @InjectModel(AgeRating)
        private ageRating: typeof AgeRating,
        @InjectModel(VideoCategory)
        private videoCategory: typeof VideoCategory,
        @InjectModel(Status)
        private status: typeof Status,
        @InjectModel(Publisher)
        private publisher: typeof Publisher,
        @InjectModel(Genre)
        private genre: typeof Genre,
        @InjectModel(ListViewState)
        private listViewState: typeof ListViewState,
        @InjectModel(DayOfWeek)
        private dayOfWeekGetOut: typeof DayOfWeek,
        @InjectModel(SeasonOfYear)
        private seasonOfYear: typeof SeasonOfYear,
        @InjectModel(Comments)
        private comments: typeof Comments,
        @InjectModel(CommentsRate)
        private commentsRate: typeof CommentsRate,
        @InjectModel(VideoRate)
        private videoRate: typeof VideoRate,
        private usersService: UsersService,
        private authService: AuthService,
        private filesService: FilesService,
        private videoService: VideoService,
        private videoSeriesService: VideoSeriesService
    ) {
    }

    getRndInteger(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //region create seed
    async createSeed() {
        await this.createSeedType();
        await this.createSeedRole();
        await this.createSeedAgeRating();
        await this.createSeedVideoCategory();
        await this.createSeedStatus();
        await this.createSeedPublisher();
        await this.createSeedGenre();
        await this.createSeedListState();
        await this.createSeedDayOfWeek();
        await this.createSeedSeasonOfYear();

        await this.createSeedUser();
        await this.createSeedVideo();
    }

    async upsertSeed() {
        await this.upsertSeedType();
        await this.upsertSeedRole();
        await this.upsertSeedAgeRating();
        await this.upsertSeedVideoCategory();
        await this.upsertSeedStatus();
        await this.upsertSeedPublisher();
        await this.upsertSeedGenre();
        await this.upsertSeedListState();
        await this.upsertSeedDayOfWeek();
        await this.upsertSeedSeasonOfYear();
    }

    //endregion

    // TODO: Type
    // region  Type

    async createSeedType() {
        await this.type.bulkCreate(types);
    }


    async upsertSeedType() {
        for (const type of types) {
            await this.type.upsert(type);
        }
    }

    //endregion

    // TODO: Role
    // region Role

    async createSeedRole() {
        await this.role.bulkCreate(roles);
    }

    async upsertSeedRole() {
        for (const role of roles) {
            await this.role.upsert(role);
        }
    }

    //endregion

    // TODO: ageRating
    //region AgeRating
    async createSeedAgeRating() {
        await this.ageRating.bulkCreate(ageRatings);
    }

    async upsertSeedAgeRating() {
        for (const ageRating of ageRatings) {
            await this.ageRating.upsert(ageRating);
        }
    }

    //endregion

    //region VideoCategory
    async createSeedVideoCategory() {
        await this.videoCategory.bulkCreate(videoCategorys);
    }

    async upsertSeedVideoCategory() {
        for (const videoCategory of videoCategorys) {
            await this.videoCategory.upsert(videoCategory);
        }
    }

    //endregion

    //region Statuses
    async createSeedStatus() {
        await this.status.bulkCreate(statuses);
    }

    async upsertSeedStatus() {
        for (const status of statuses) {
            await this.status.upsert(status);
        }
    }

    //endregion

    //region Publisher
    async createSeedPublisher() {
        await this.publisher.bulkCreate(publishers);
    }

    async upsertSeedPublisher() {
        for (const publisher of publishers) {
            await this.publisher.upsert(publisher);
        }
    }

    //endregion

    //region Genre
    async createSeedGenre() {
        await this.genre.bulkCreate(genres);
    }

    async upsertSeedGenre() {
        for (const genre of genres) {
            await this.genre.upsert(genre);
        }
    }

    //endregion

    //region ListState
    async createSeedListState() {

        await this.listViewState.bulkCreate(listStates)
    }

    async upsertSeedListState() {
        for (const state of listStates) {
            await this.listViewState.upsert(state);
        }
    }

    //endregion

    //region DayOfWeek
    async createSeedDayOfWeek() {
        await this.dayOfWeekGetOut.bulkCreate(dayOfWeekList)
    }

    async upsertSeedDayOfWeek() {
        for (const dauOfWeek of dayOfWeekList) {
            await this.dayOfWeekGetOut.upsert(dauOfWeek);
        }
    }

    //endregion

    //region SeasonOfYear
    async createSeedSeasonOfYear() {
        await this.seasonOfYear.bulkCreate(seasonOfYearList)
    }

    async upsertSeedSeasonOfYear() {
        for (const season of seasonOfYearList) {
            await this.seasonOfYear.upsert(season);
        }
    }

    //endregion


    //region User and Admin
    async createSeedUser() {

        for (const admin of admins) {
            const member = await this.authService.registrationSeed(admin);
            await this.usersService.updateRole({userId: member.id, roleIds: [RoleUser.ADMIN]})
        }

        for (const user of users) {
            await this.authService.registration(user);
        }

        const countUserCreate = 40;
        for (let i = 0; i < countUserCreate; i++) {
            await this.authService.registration({
                email: faker.internet.email(),
                nickname: faker.internet.userName(),
                password: faker.internet.password(),
            });
        }
    }

    //endregion

    async createSeedVideo() {
        const arr = [anime, movie, serials]
        const users = await this.usersService.getUserAll();

        for (const arrElement of arr) {
            for (const video of arrElement) {
                // create video
                const entity = await this.videoService.createSeed(video);
                //create series when its exists
                if (video.series) {
                    await this.videoSeriesService.create({videoId: entity.video.id, series: video.series.series})
                }

                // Create video rate
                const countRateVideo = this.getRndInteger(5, users.length);
                const rateDate = [];
                for (let i = 0; i < countRateVideo; i++) {
                    const randomUser = Math.floor(Math.random() * users.length)
                    const user = users[randomUser]
                    rateDate.push({
                        videoId: entity.video.id,
                        rate: this.getRndInteger(1, 10),
                        userId: user.id
                    });
                }
                await this.videoRate.bulkCreate(rateDate);

                // create random count comments to video
                // For more count comment edit here
                const countComments = this.getRndInteger(5, 15);
                const commentsData = [];
                for (let i = 0; i < countComments; i++) {
                    const randomUser = Math.floor(Math.random() * users.length)
                    const user = users[randomUser]
                    commentsData.push({
                        userId: user.id,
                        videoId: entity.video.id,
                        // For more count words in comment edit here
                        comment: faker.word.words({count: {min: 10, max: 30}})
                    });
                }
                const comments = await this.comments.bulkCreate(commentsData);

                // create random comments rate
                const commentsRateData = []
                for (const comment of comments) {
                    // For more count rate edit here
                    const randomCommentsRate = Math.floor(Math.random() * 8);
                    for (let j = 0; j < randomCommentsRate; j++) {
                        const randomUser = Math.floor(Math.random() * users.length);
                        const user = users[randomUser];
                        const rate = Math.floor(Math.random() * 2);
                        commentsRateData.push({
                            rate: rate === 1,
                            userId: user.id,
                            commentId: comment.id,
                        });
                    }
                }
                await this.commentsRate.bulkCreate(commentsRateData);
            }
        }
    }


}
