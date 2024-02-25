import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Video from "@models/video/video.entity";

@Entity({name: 'types'})
class Type {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @Column({type: 'text', nullable: true})
    description: string;

    @OneToMany(() => Video, video => video.type)
    video: Video[];
}

export default Type;
