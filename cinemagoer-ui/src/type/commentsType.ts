import {User} from "@/type/user";

export type CommentsType = {
    id: number;
    like: number;
    dislike: number;
    userLike: boolean | string;
    userId: number;
    user: User;
    videoId: number;
    userAnswerId: number | null;
    commentId: number | null;
    comments: string;
    createdAt: string;
}
