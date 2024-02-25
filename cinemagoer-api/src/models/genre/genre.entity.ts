import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import Video from "@models/video/video.entity";

export interface GenreCreateAttr {
    name: string;
}

@Entity({name: 'genre'})
class Genre {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    name: string;

    @Column({type: 'text', nullable: true})
    description: string;

    @ManyToMany(() => Video, video => video.genre)
    //@JoinTable({name: 'video-genre'})
    video: Video[];
}

export default Genre;
