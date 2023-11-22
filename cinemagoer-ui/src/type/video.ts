import {BaseResponse} from "@/type/base-response";

export type Video = {
    id: number;
    rate: number | null;
    yourRate: number | null;
    name: string[];
    dateRelease: string;
    genre: BaseResponse[];
    type: BaseResponse;
    status: BaseResponse;
    videoCategory: BaseResponse;
    publisher: BaseResponse;
    ageRating: BaseResponse;
    icon: string;
}
