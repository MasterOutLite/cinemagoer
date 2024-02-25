import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Video from "@models/video/video.entity";

@Entity({name: 'season-of-year'})
export default class SeasonOfYear {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Video, video => video.seasonOfYear)
    video: Video[];
}
