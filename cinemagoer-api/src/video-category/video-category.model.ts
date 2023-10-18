import {AllowNull, AutoIncrement, Column, HasMany, Model, PrimaryKey, Table, Unique} from "sequelize-typescript";
import Video from "@src/video/video.model";

export interface VideoCategoryCreateAttr {
    name: string;

}

@Table({tableName: 'video-category', createdAt: false, updatedAt: false})
class VideoCategory extends Model<VideoCategory, VideoCategoryCreateAttr> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Unique
    @Column
    name: string;

    @Column
    description: string;

    @HasMany(()=> Video)
    video: Video[];
}

export default VideoCategory;
