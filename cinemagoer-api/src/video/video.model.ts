import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    BelongsToMany,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import Type from "@src/type/type.model";
import Status from "@src/status/status.model";
import VideoCategory from "@src/video-category/video-category.model";
import Publisher from "@src/publisher/publisher.model";
import AgeRating from "@src/age-rating/age-rating.model";
import ListView from "@src/list-view/list-view.model";
import VideoGenre from "@src/genre/video-genre.model";
import Genre from "@src/genre/genre.model";
import VideoRate from "@src/video-rate/video-rate.model";
import Comments from "@src/comments/comments.model";
import VideoInfo from "@src/video-info/video-info.model";
import VideoSeries from "@src/video-series/video-series.model";
import GroupVideo from "@src/group/group-video.model";
import Group from "@src/group/group.model";
import Season from "@src/season/season.model";

export interface VideoCreateAttr {
    name: string[];
    dateRelease: Date;
    typeId: number;
    statusId: number;
    videoCategoryId: number;
    publisherId: number;
    ageRatingId: number;
}

@Table({tableName: 'videos',})
class Video extends Model<Video, VideoCreateAttr> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Column({type: DataType.ARRAY(DataType.STRING)})
    name: string[];

    @AllowNull(false)
    @Column
    dateRelease: Date;

    @Column
    icon: string;

    @AllowNull(false)
    @ForeignKey(() => Type)
    @Column
    typeId: number;
    @BelongsTo(() => Type)
    type: Type

    @AllowNull(false)
    @ForeignKey(() => Status)
    @Column
    statusId: number;
    @BelongsTo(() => Status)
    status: Status

    @AllowNull(false)
    @ForeignKey(() => VideoCategory)
    @Column
    videoCategoryId: number;
    @BelongsTo(() => VideoCategory)
    videoCategory: VideoCategory

    @AllowNull(false)
    @ForeignKey(() => Publisher)
    @Column
    publisherId: number;
    @BelongsTo(() => Publisher)
    publisher: Publisher

    @AllowNull(false)
    @ForeignKey(() => AgeRating)
    @Column
    ageRatingId: number;
    @BelongsTo(() => AgeRating)
    ageRating: AgeRating

    @HasMany(() => ListView)
    listView: ListView[];

    @HasMany(() => VideoRate)
    videoRate: VideoRate[];

    @HasMany(() => Comments)
    comments: Comments[];

    @HasMany(() => VideoInfo)
    videoInfo: VideoInfo[];

    @HasMany(() => VideoSeries)
    videoSeries: VideoSeries[];

    @HasMany(() => Season)
    season: Season[];

    @BelongsToMany(() => Genre, () => VideoGenre)
    genre: Genre[];

    @BelongsToMany(() => Group, () => GroupVideo)
    group: Group[];
}


export default Video;
