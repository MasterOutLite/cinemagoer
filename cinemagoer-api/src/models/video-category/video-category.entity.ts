import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Video from "@models/video/video.entity";


@Entity({name: 'video-category'})
class VideoCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @Column({unique: false, nullable: true})
    description: string;

    @OneToMany(() => Video, video => video.videoCategory)
    video: Video[];
}

export default VideoCategory;
