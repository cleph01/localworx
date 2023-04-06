import {
    SET_BUSINESS_ID,
    FETCH_BUSINESS_INFO_INITIATED,
    FETCH_BUSINESS_INFO_SUCCESS,
} from "../actions/businessProfileActions";

const initialState = {
    business: null,
};

const businessProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BUSINESS_ID:
            return {
                ...state,
                business: { businessId: action.payload },
            };
        case FETCH_BUSINESS_INFO_INITIATED:
            return {
                ...state,
                isLoading: true,
            };
        case FETCH_BUSINESS_INFO_SUCCESS:
            return {
                ...state,
                business: action.payload,
                isLoading: false,
            };

        default:
            return state;
    }
};

export default businessProfileReducer;
