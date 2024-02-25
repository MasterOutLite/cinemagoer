import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import Video from "@models/video/video.entity";
import UserListView from "@models/user-list-view/user-list-view.entity";

@Entity({name: 'list-view'})
class ListView {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Video, video => video.listView)
    video: Video
    @Column()
    videoId: number;

    @ManyToOne(() => UserListView, list => list.listView)
    userListView: UserListView
    @Column()
    userListViewId: number;
}


export default ListView;
