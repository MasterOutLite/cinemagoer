import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Video from "@models/video/video.entity";

@Entity({name: 'video-info'})
class VideoInfo {
    @PrimaryGeneratedColumn()
    id: number;


    @ManyToOne(() => Video, video => video.videoInfo)
    video: Video;
    @Column({unique: true})
    videoId: number;

    @Column({type: 'text', nullable: true})
    description: string;

    @Column({type: 'simple-array', nullable: true})
    mainCharacters: string[];

    @Column({nullable: true, type: 'simple-array'})
    trailers: string[];

    @Column({nullable: true})
    countSeries: number;

    @Column({nullable: true, type: 'simple-array'})
    pictures: string[];

    @Column({nullable: true})
    duration: string;
}

export default VideoInfo;
