
import * as actionTypes from '../actions/actionTypes'


const initialState = {
    courses: null,
    course: null,
    processing: false,
    error: null,
    ltr_error: null,
    ltr_processing: false,
    ltr_pager: null,
    ltr_data: null,
    ltr_pageItems: null
}

const courseReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionTypes.courseConstants.FETCH_COURSE_REQUEST:
            return {
                ...state,
                processing: true,
                error: {}
            };
        case actionTypes.courseConstants.FETCH_COURSE_FAILURE:
            return {
                ...state,
                processing: false,
                courses: null,
                error: action.errors.response.data
            };
        case actionTypes.courseConstants.FETCH_COURSE_SUCCESS:
            return {
                ...state,
                courses: action.courses,
                processing: false,
                error: null
            };
        case actionTypes.courseConstants.FETCH_LECTURERS_REQUEST:
            return {
                ...state,
                processing: true,
                error: {}
            };
        case actionTypes.courseConstants.FETCH_LECTURERS_FAILURE:
            return {
                ...state,
                processing: false,
                lecturers: null,
                error: action.errors.response.data
            };
        case actionTypes.courseConstants.FETCH_LECTURERS_SUCCESS:
            console.log('success reducer', action.lecturers)
            return {
                ...state,
                ltr_processing: false,
                ltr_error: null,
                ltr_pageItems: action.lecturers.pageItems,
                ltr_pager: action.lecturers.pager
            };
        default:
            return state;
    }
}

export default courseReducer








