import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_EDIT_FAIL,
  USER_EDIT_RESET,
  USER_SOLO_REQUEST,
  USER_SOLO_SUCCESS,
  USER_SOLO_FAIL,
  USER_SOLO_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_SUBSCRIBE_REQUEST,
  USER_SUBSCRIBE_SUCCESS,
  USER_SUBSCRIBE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
} from "../constants/userConstants";

export const userEditReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_EDIT_REQUEST:
      return { loading: true };

    case USER_EDIT_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };

    case USER_EDIT_FAIL:
      return { loading: false, error: action.payload };

    case USER_EDIT_RESET:
      return {};

    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };

    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };

    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };

    case USER_LIST_RESET:
      return { users: [] };

    default:
      return state;
  }
};

export const userSoloReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_SOLO_REQUEST:
      return { ...state, loading: true };

    case USER_SOLO_SUCCESS:
      return { loading: false, user: action.payload };

    case USER_SOLO_FAIL:
      return { loading: false, error: action.payload };

    case USER_SOLO_RESET:
      return { user: {} };

    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userSubscribeReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_SUBSCRIBE_REQUEST:
      return { loading: true };
    case USER_SUBSCRIBE_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_SUBSCRIBE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const userProfileReducer = (state = { profileInfo: {} }, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { ...state, loading: true };

    case USER_PROFILE_SUCCESS:
      return { loading: false, profileInfo: action.payload };

    case USER_PROFILE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
