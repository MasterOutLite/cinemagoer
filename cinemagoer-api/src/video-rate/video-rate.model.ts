import {
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    ForeignKey,
    Length,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import Video from "@src/video/video.model";
import User from "@users/users.model";

export interface VideoRateCreateAttr {
    videoId: number;
    userId: number;
    rate: number;
}

@Table({tableName: 'video-rate'})
class VideoRate extends Model<VideoRate, VideoRateCreateAttr> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @ForeignKey(() => Video)
    @Column
    videoId: number;
    @BelongsTo(() => Video)
    video: Video;

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column
    userId: number;
    @BelongsTo(() => User)
    user: User;

    @AllowNull(false)
    @Column
    rate: number;

}

export default VideoRate;
