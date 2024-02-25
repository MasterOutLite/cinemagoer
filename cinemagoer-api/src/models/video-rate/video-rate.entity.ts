import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Video from "@models/video/video.entity";
import User from "@models/users/users.entity";

@Entity({name: 'video-rate'})
class VideoRate {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Video, video => video.videoRate)
    video: Video;
    @Column()
    videoId: number;

    @OneToMany(() => User, user => user.videoRate)
    user: User;
    @Column()
    userId: number;

    @Column()
    rate: number;
}

export default VideoRate;
