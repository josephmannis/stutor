import Cookie from 'js-cookie';
import store from '../store';
import $ from 'jquery'
import { STUDENT, TUTOR } from '../Constants/userTypes';

export const CREATE_USER = 'CREATE_USER';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILED = 'CREATE_USER_FAILED';

export const EDIT_USER = 'EDIT_USER';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILED = 'EDIT_USER_FAILED';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

export const SIGNUP_USER = 'SIGNUP_USER';
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_FAILED = 'SIGNUP_USER_FAILED';

export const FETCH_SESSION = 'FETCH_SESSION';
export const FETCH_SESSION_SUCCESS = 'FETCH_SESSION_SUCCESS';
export const FETCH_SESSION_FAILED = 'FETCH_SESSION_FAILED';

export const FETCH_USER_INFO = 'FETCH_USER_INFO';
export const FETCH_USER_INFO_SUCCESS = 'FETCH_USER_INFO_SUCCESS';
export const FETCH_USER_INFO_FAILED = 'FETCH_USER_INFO_FAILED';


export const LOGOUT_USER = 'DELETE_SESSION';

const USER_COOKIE = 'user';

// user enters stuff -> clicks sign up -> goes to form -> submit -> dispatch signup user -> on success dispatch login user -> ok
// user enters stuff -> clicks login -> on success dispatch login user success, just logs them in -> on fail dispatch login user failed, shows error
export function fetchSession() {
    let data = Cookie.getJSON('user');
    console.log(data)

    if (data) {
        store.dispatch({
            type: FETCH_SESSION_SUCCESS,
            payload: data,
        });
    } else {
        store.dispatch({
            type: FETCH_SESSION_FAILED,
        });
    }
}

export function loginUser(email, password, type) {
    console.log(email)
    console.log(password)
    console.log(type)

    $.ajax(
        "/api/v1/sessions", {
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify({ email: email, password: password, user_type: type }),
            success: (resp) => {
                console.log("nice job")
                console.log(resp.data)
                Cookie.set(USER_COOKIE, resp.data);

                store.dispatch({
                    type: LOGIN_USER_SUCCESS,
                    payload: resp.data,
                });
            },
            error: (resp) => {
                store.dispatch({
                    type: LOGIN_USER_FAILED,
                    payload: resp.data,
                });
            }
        }
    );
}

export function logoutUser() {
    Cookie.remove(USER_COOKIE);
    store.dispatch({
        type: LOGOUT_USER,
    })
}

export function createUser(userInfo, userType) {
    console.log("creating user")
    console.log(userInfo)
}

function fetchAjax(path, data, callback) {
    $.ajax(
        path, {
            method: "get",
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
            data: data
        }
    ).done(callback);
}

function postAjax(path, data, callback) {
    $.ajax(
        path, {
            method: "post",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
        }
    ).done(callback);
}


function putAjax(path, data, callback) {
    $.ajax(
        path, {
            method: "put",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json; charset=UTF-8",
        }
    ).done(callback);
}


export function createStudent(accountData, paymentData) {
    console.log("cookin up a studert")
    console.log(accountData);
    console.log(paymentData);
}

export function createTutor(accountData, tutorData, paymentData) {
    console.log("cookin up a tooter")
    console.log(accountData);
    console.log(tutorData);
    console.log(paymentData);
}

export function editStudent(oldValues, newValues, id) {

}

/**
 * Edits the currently signed in tutor, updating the account information
 * to reflect the given values, and adding or removing any of the listed
 * tutor information as necessary, based on the tutor's previously stored information.
 * 
 * @param {Object} values, an object including information about the tutor's account
 * and tutoring information, such as availabilities, courses, and subject areas
 */
export function udpateTutorProfile(values) {
    console.log('submitting:');
    let state = store.getState();
    let oldValues = state.currentUser.user_info;
    let id = state.currentUser.user_id;

    console.log('old:');
    console.log(oldValues);

    console.log('new:');
    console.log(values);
    console.log(id)

    // Change their account information  
    // editTutorAccountInfo({
    //     name: values.name,
    //     email: values.email,
    //     university: values.university,
    //     gpa: values.gpa
    // }, id)

    // let newTutorInfo = {
    //     courses: newValues.courses,
    //     subject_areas: newValues.subject_areas,
    //     availabilities: newValues.availabilities
    // }
}

/**
 * Updates the account information (name, email, gpa, and university) of the tutor with the
 * given id. 
 * @param {object} values 
 * @param {number} tutor_id 
 */
function editTutorAccountInfo(values, tutor_id) {
    putAjax('/api/v1/tutors/' + tutor_id, { tutor: values },
        (resp) => {
            // TODO dispatch this
            console.log(resp);
        });
}

/**
 * Updates the tutor profile information (availability, courses, and subject areas) 
 * of the tutor with the given id. Any values that are present in the new values but not
 * in the old will be added, and any values that are in the old values but not in the new 
 * will be deleted. 
 * @param {object} oldValues 
 * @param {object} newValues 
 * @param {number} tutor_id 
 */
function editTutorProfileInformation(oldValues, newValues, tutor_id) {

}

export function fetchUserInfo(user_id, user_type) {
    switch (user_type) {
        case STUDENT: fetchStudentInfo(user_id); break;
        case TUTOR: fetchTutorInfo(user_id); break;
        default: new Error("Invalid user type");
    }
}

function fetchStudentInfo(user_id) {
    fetchAjax("/api/v1/students/" + user_id, {},
        (resp) => {
            store.dispatch({ type: FETCH_USER_INFO_SUCCESS, payload: resp.data })
        });
}

function fetchTutorInfo(user_id) {
    fetchAjax("/api/v1/tutors/" + user_id, {},
        (resp) => {
            console.log(resp)
            store.dispatch({ type: FETCH_USER_INFO_SUCCESS, payload: resp.data })
        });
}