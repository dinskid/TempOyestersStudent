import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from '../actions';

import {
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  registerUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
} from './actions';

import { setCurrentUser } from '../../helpers/Utils';
import axiosInstance from '../../helpers/axiosInstance';

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

const loginWithEmailPasswordAsync = async (
  customer_email,
  customer_password,
  using_google = false
) => {
  try {
    const values = {
      student_email: customer_email,
      student_password: customer_password,
      using_google,
    };
    const result = await axiosInstance.post('/student/auth/login', { values });
    return result.data;
  } catch (err) {
    try {
      const result = err.response;
      return result;
    } catch (error) {
      return error;
    }
  }
};

function* loginWithEmailPassword({ payload }) {
  const { email, password, using_google = false } = payload.user.values;
  const { history, toggleClick } = payload.user;
  // console.log(payload);
  try {
    const customer_email = email;
    const customer_password = password;
    const loginUser = yield call(
      loginWithEmailPasswordAsync,
      customer_email,
      customer_password,
      using_google
    );
    // console.log(loginUser);
    if (loginUser.success) {
      const item = { uid: loginUser.token };
      setCurrentUser(item);
      yield put(loginUserSuccess(item));
      history.push('/app/pages/mycourses');
    } else {
      yield put(loginUserError(loginUser.error));
    }
  } catch (error) {
    // console.log(typeof(toggleClick));
    try {
      yield put(loginUserError(error.response.data.error));
    } catch (err) {
      yield put(loginUserError('unable to login'));
    }
  }
}

export function* watchRegisterUser() {
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

const registerWithEmailPasswordAsync = async ({
  customer_email,
  customer_password,
  customer_first_name,
  customer_last_name,
  customer_phone_number,
  using_google = false,
  customer_id,
}) => {
  try {
    console.log(customer_id);
    const values = {
      student_first_name: customer_first_name,
      student_last_name: customer_last_name,
      student_phone_number: customer_phone_number,
      student_email: customer_email,
      student_password: customer_password,
      using_google,
      customer_id,
    };
    const result = await axiosInstance.post('/student/auth/register', {
      values,
    });
    return result.data;
    console.log(result);
  } catch (error) {
    try {
      const result = error.response;
      return result;
    } catch (err) {
      return err;
    }
  }
};

function* registerWithEmailPassword({ payload }) {
  const {
    customer_email,
    customer_password,
    customer_first_name,
    customer_last_name,
    using_google = false,
  } = payload.user.values;
  const { history, toggleClick } = payload.user;
  try {
    const registerUser = yield call(
      registerWithEmailPasswordAsync,
      payload.user.values
    );
    // console.log(registerUser);
    if (registerUser.success) {
      const item = { uid: registerUser.token };
      setCurrentUser(item);
      yield put(registerUserSuccess(item));
      history.push('/app/pages/product/data-list');
    } else {
      // console.log(typeof(toggleClick));
      try {
        yield put(registerUserError(registerUser.error));
      } catch (err) {
        yield put(registerUserError('unable to register'));
      }
    }
  } catch (error) {
    // console.log(typeof(toggleClick));
    try {
      yield put(registerUserError(error.response.data.error));
    } catch (err) {
      yield put(registerUserError('unable to register'));
    }
  }
}

export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logout);
}

function* logout({ payload }) {
  const { history } = payload;
  setCurrentUser();
  history.push('/Student/user/login');
}

export function* watchForgotPassword() {
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

const forgotPasswordAsync = async (email) => {
  try {
    const values = { email };
    console.log(values);
    const result = await axiosInstance.post('/student/auth/forgotPassword', {
      values,
    });
    console.log(result);
    return result.data;
  } catch (error) {
    try {
      const result = error.response.data;
      return result;
    } catch (err) {
      return err;
    }
  }
};

function* forgotPassword({ payload }) {
  const { email } = payload.forgotUserMail;
  try {
    const forgotPasswordStatus = yield call(forgotPasswordAsync, email);

    if (forgotPasswordStatus.success) {
      yield put(forgotPasswordSuccess('success'));
    } else {
      try {
        yield put(forgotPasswordError(forgotPasswordStatus.error));
      } catch (err) {
        yield put(forgotPasswordError('unable to send password forgot mail'));
      }
    }
  } catch (error) {
    try {
      yield put(forgotPasswordError(error.response.data.error));
    } catch (err) {
      yield put(forgotPasswordError('unable to send password forgot mail'));
    }
  }
}

export function* watchResetPassword() {
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

const resetPasswordAsync = async (resetPasswordCode, newPassword) => {
  try {
    const values = { email: resetPasswordCode, newPassword };
    const result = await axiosInstance.post('/student/auth/reset-password', {
      values,
    });
    return result.data;
  } catch (error) {
    try {
      const result = error.response.data;
      return result;
    } catch (err) {
      return err;
    }
  }
};

function* resetPassword({ payload }) {
  const { newPassword, resetPasswordCode } = payload;
  try {
    const resetPasswordStatus = yield call(
      resetPasswordAsync,
      resetPasswordCode,
      newPassword
    );

    if (resetPasswordStatus.success) {
      yield put(resetPasswordSuccess('success'));
    } else {
      try {
        yield put(resetPasswordError(resetPasswordStatus.error));
      } catch (err) {
        yield put(resetPasswordError('unable to update passsword'));
      }
    }
  } catch (error) {
    try {
      yield put(resetPasswordError(error.response.data.error));
    } catch (e) {
      yield put(resetPasswordError('unable to update passsword'));
    }
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchForgotPassword),
    fork(watchResetPassword),
  ]);
}
