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
    name: string;
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
    @Length({min: 0, max: 10})
    @Column
    rate: number;

}

export default VideoRate;
