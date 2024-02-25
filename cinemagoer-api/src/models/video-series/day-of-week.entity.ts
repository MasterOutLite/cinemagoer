import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import VideoSeries from "@models/video-series/video-series.entity";

@Entity({name: 'day-of-week'})
export default class DayOfWeek {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => VideoSeries, series => series.dayShow)
    videoSeries: VideoSeries[];
}
