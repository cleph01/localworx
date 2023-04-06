export const SET_BUSINESS_ID = "SET_BUSINESS_ID";
export const FETCH_BUSINESS_INFO_SUCCESS = "FETCH_BUSINESS_INFO_SUCCESS,";
export const FETCH_BUSINESS_INFO_INITIATED = "SET_BUSINESS_INITIATED";

export const CREATE_TWILIO_SUB_ACCOUNT_INITIATED = "CREATE_TWILIO_SUB_ACCOUNT_INITIATED"
export const CREATE_TWILIO_SUB_ACCOUNT_SUCCESSFUL = "CREATE_TWILIO_SUB_ACCOUNT_SUCCESSFUL"
export const CREATE_TWILIO_SUB_ACCOUNT_FAILED = "CREATE_TWILIO_SUB_ACCOUNT_FAILED";

export const createTwilioSubAccount = () => (dispatch) => {

    try {
        

        
    } catch (error) {
        
    }    

}


export const setBusinessId = (businessId) => {
    return {
        type: SET_BUSINESS_ID,
        payload: businessId,
    };
};

export const setBusiness = (business) => async (dispatch) => {
    dispatch({
        type: FETCH_BUSINESS_INFO_SUCCESS,
        payload: business,
    });
};
