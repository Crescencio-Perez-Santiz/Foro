import axios from "axios";
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
  USER_SOLO_REQUEST,
  USER_SOLO_SUCCESS,
  USER_SOLO_FAIL,
  USER_SOLO_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_SUBSCRIBE_REQUEST,
  USER_SUBSCRIBE_SUCCESS,
  USER_SUBSCRIBE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
} from "../constants/userConstants";

export const editUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_EDIT_REQUEST });
    dispatch({ type: USER_SOLO_RESET });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      "http://52.4.187.24/users/put/",
      user,
      config
    );

    dispatch({
      type: USER_EDIT_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_EDIT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getSoloUserValue = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_SOLO_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`http://52.4.187.24/users/${id}/`, config);

    dispatch({
      type: USER_SOLO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_SOLO_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getSoloUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_SOLO_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://52.4.187.24/users/soloUser/${id}/`,
      config
    );

    console.log("soloUser", data);

    dispatch({
      type: USER_SOLO_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_SOLO_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getListUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://52.4.187.24/users/getUsers/`,
      config
    );

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const logout = () => (disptach) => {
  localStorage.removeItem("userInfo");
  disptach({ type: USER_LOGOUT });
};

export const register = (user_name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://52.4.187.24/users/register/",
      { user_name: user_name, email: email, password: password },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://52.4.187.24/users/login/",
      { email: email, password: password },
      config
    );
    console.log("login", data);

    // Después de que el usuario inicia sesión, hacemos una nueva solicitud para obtener los datos actualizados del usuario
    const { data: updatedData } = await axios.get(
      `http://52.4.187.24/users/profile/`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`, // Usamos el token que acabamos de obtener
        },
      }
    );
    console.log("actualizado", updatedData);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: updatedData, // Usamos los datos actualizados
    });

    localStorage.setItem("userInfo", JSON.stringify(updatedData)); // Almacenamos los datos actualizados
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const subscribeAction = (cardDetails) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_SUBSCRIBE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(
      `http://52.4.187.24/users/subscriber/`,
      cardDetails,
      config
    );

    // Después de que el usuario se suscribe, hacemos una nueva solicitud para obtener los datos actualizados del usuario
    const { data } = await axios.get(
      `http://52.4.187.24/users/profile/`,
      config
    );
    console.log("actuaizado", data);

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data)); // Almacenamos los datos actualizados
  } catch (error) {
    dispatch({
      type: USER_SUBSCRIBE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PROFILE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://52.4.187.24/users/profile/`,
      config
    );

    dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data)); // Almacenamos los datos actualizados
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
