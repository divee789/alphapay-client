// import { Dispatch } from 'redux'

// import * as actionTypes from './actionTypes';
// import { Course, Lecturer } from '../types'

// import APIRequest from '../../services/api-services';
// import APIServiceError from '../../services/error-services';

// const BaseURL = process.env.BASE_URL || 'http://localhost:1000';
// const Request = new APIRequest(BaseURL);


// export function get_level_courses(level: number) {
//     function request() {
//         return { type: actionTypes.courseConstants.FETCH_COURSE_REQUEST }
//     }
//     function success(courses: Course) {
//         return { type: actionTypes.courseConstants.FETCH_COURSE_SUCCESS, courses }
//     }
//     function failure(errors: any) {
//         return { type: actionTypes.courseConstants.FETCH_COURSE_FAILURE, errors }
//     }

//     return async (dispatch: Dispatch) => {
//         try {
//             await dispatch(request())
//             const course = await Request.getLevelCourses(level)
//             console.log('action_course', course)
//             dispatch(success(course))
//         } catch (error) {
//             if (error instanceof APIServiceError) {
//                 console.log('error in getting course', error);
//                 dispatch(failure(error));
//                 throw error.response.data;
//             }
//         }
//     }
// }

// export function getLecturers(page: number) {
//     function request() {
//         return { type: actionTypes.courseConstants.FETCH_LECTURERS_REQUEST }
//     }
//     function success(lecturers: Lecturer) {
//         console.log('action', lecturers)
//         return { type: actionTypes.courseConstants.FETCH_LECTURERS_SUCCESS, lecturers }
//     }
//     function failure(errors: any) {
//         return { type: actionTypes.courseConstants.FETCH_LECTURERS_FAILURE, errors }
//     }

//     return async (dispatch: Dispatch) => {
//         try {
//             await dispatch(request())
//             const lecturers = await Request.getLecturers(page)
//             console.log('action_lecturers', lecturers)
//             dispatch(success(lecturers))
//         } catch (error) {
//             if (error instanceof APIServiceError) {
//                 console.log('error in getting lecturer', error);
//                 dispatch(failure(error));
//             }
//         }
//     }
// }

import React from 'react'
