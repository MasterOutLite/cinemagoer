import {AllowNull, AutoIncrement, Column, HasMany, Model, PrimaryKey, Table} from "sequelize-typescript";
import VideoSeries from "@src/video-series/video-series.model";

export interface DayOfWeekGetOutModelCreateAtr {
    id: number;
    name: string;
}

@Table({tableName:'day-of-week',updatedAt: false, createdAt: false})
export default class DayOfWeek extends Model<DayOfWeek, DayOfWeekGetOutModelCreateAtr> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Column
    name: string;

    @HasMany(() => VideoSeries)
    videoSeries: VideoSeries[];
}
