import {ListViewVideo} from "@/type/list-view-video";
import {post, PostPatch, sendRequest} from "@/helper/api";
import {ListView} from "@/type/list-view";

class UserListViewService {
    async getListViewVideo(id: number) {
        const url = `user-list-view/listView?videoId=${id}`;
        const date = await sendRequest(url);
        return date as ListViewVideo;
    }

    async getUserListWithVideo() {
        const url = `user-list-view/video`;
        const date = await sendRequest(url);
        return date as ListView[];
    }

    async getUserList() {
        const url = `user-list-view`;
        const date = await sendRequest(url);
        return date as ListView[];
    }

    async addVideoToUserListView(userListViewId: number, videoId: number) {
        return await post(PostPatch.UserList, {
            userListViewId,
            videoId,
            add: true
        }) as { userListViewId: number, videoId: number, add: boolean }
    }

    async removeVideoToUserListView(userListViewId: number, videoId: number) {
        return await post(PostPatch.UserList, {
            userListViewId,
            videoId,
            add: false
        }) as { userListViewId: number, videoId: number, add: boolean }
    }

}

export default new UserListViewService()
