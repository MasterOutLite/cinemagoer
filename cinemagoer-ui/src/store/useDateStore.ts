import {create} from "zustand";
import {BaseResponse} from "@/type/base-response";


type State = {
    type: BaseResponse[];
    status: BaseResponse[];
    ageRating: BaseResponse[];
    genre: BaseResponse[];
}
type Action = {
    setType: (value: BaseResponse[]) => void;
    setStatus: (value: BaseResponse[]) => void;
    setAgeRating: (value: BaseResponse[]) => void;
    setGenre: (value: BaseResponse[]) => void;
}

export const useDateStore = create<State & Action>((set, get) => (
    {
        type: [],
        status: [],
        ageRating: [],
        genre: [],

        setType(type) {
            set(state => ({...state, type}))
        },
        setStatus(status) {
            set(state => ({...state, status}))
        },
        setAgeRating(ageRating) {
            set(state => ({...state, ageRating}))
        },
        setGenre(genre) {
            set(state => ({...state, genre}))
        },
    }
));
