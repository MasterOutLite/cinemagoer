import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import ListViewState from "@models/list-view-state/list-view-state.entity";
import User from "@models/users/users.entity";
import ListView from "@models/list-view/list-view.entity";

@Entity({name: 'user-list-view'})
class UserListView {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => ListViewState, list => list.userListView)
    listViewState: ListViewState;
    @Column()
    listViewStateId: number;

    @ManyToOne(() => User, user => user.userListView)
    user: User;
    @Column()
    userId: number;

    @OneToMany(() => ListView, list => list.userListView)
    listView: ListView[];
}


export default UserListView;
