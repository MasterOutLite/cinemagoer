import {useDateStore} from "@/store/useDateStore";
import {BaseResponse} from "@/type/base-response";

class FilterService {

    getType() {

        if (useDateStore.getState().type) {
            return useDateStore.getState().type;
        }


    }
}

export default new FilterService();
