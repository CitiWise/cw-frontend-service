import React, { useEffect, useReducer, useState } from "react";
import {
  login,
  authenticateUser,
  logout,
  signUp,
  generateVmsCookie,
  logoutUms,
} from "../api/auth";
import { obtainProfileData } from "../api/profile";
import * as localForage from "localforage";
import produce from "immer";
import { envs } from "../utils/env";
const { appType } = envs;

const initialState = {
  state: envs.apiState,
  client_id: envs.clientId,
  redirect_url: envs.redirectUrl,
  oauthCode: "",
  xsrfToken: "",
  userRoles: null,
  authLoaded: false,
  isLogined: false,
  profile: null,
  profileLoaded: false,
  role: appType,
  companyData: [],
  selectedCompanyIds: [],
};

const AUTH_AUTHENTICATE = "AUTH_AUTHENTICATE";
const AUTH_LOGOUT = "AUTH_LOGOUT";
const AUTH_LOAD_STORED_STATE = "AUTH_LOAD_STORED_STATE";
const AUTH_LOGIN = "AUTH_LOGIN";
const OBTAIN_PROFILE_DATA = "OBTAIN_PROFILE_DATA";
const CHANGE_AUTH_ROLE = "CHANGE_AUTH_ROLE";
const UPDATE_PROFILE_DATA = "UPDATE_PROFILE_DATA";
const UPDATE_WAREHOUSE_COMPANY_DATA = "UPDATE_WAREHOUSE_COMPANY_DATA";
const UPDATE_WAREHOUSE_SELECTED_COMPANY_ID =
  "UPDATE_WAREHOUSE_SELECTED_COMPANY_ID";

const reducer = produce((state, action) => {
  switch (action.type) {
    case AUTH_LOAD_STORED_STATE:
      return { ...state, ...action.payload };

    case UPDATE_WAREHOUSE_COMPANY_DATA:
      state.companyData = action.payload.companyData;
      break;

    case UPDATE_WAREHOUSE_SELECTED_COMPANY_ID:
      state.selectedCompanyIds = action.payload.selectedCompanyIds;
      break;

    case AUTH_AUTHENTICATE:
      if (action.payload.oauthCode)
        state.oauthCode = action.payload.oauthCode || "";
      if (action.payload.redirect_url)
        state.redirect_url = action.payload.redirect_url || "";
      if (action.payload.state) state.state = action.payload.state || "";
      if (action.payload.xsrfToken)
        state.xsrfToken = action.payload.xsrfToken || "";
      state.isLogined = action.payload.isLogined;
      state.authLoaded = true;
      break;

    case AUTH_LOGIN:
      state.oauthCode = action.payload.oauthCode;
      state.redirect_url = action.payload.redirect_url;
      state.state = action.payload.state;
      state.isLogined = true;
      break;

    case OBTAIN_PROFILE_DATA:
      state.profile = action.payload.responseBody;
      state.profileLoaded = true;
      break;
    case CHANGE_AUTH_ROLE:
      state.role = action.payload.newRole;
      break;
    case AUTH_LOGOUT:
      return initialState;
    case UPDATE_PROFILE_DATA:
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.payload.updatedData,
        },
      };
    default:
  }
});

export const AuthProvider = (props: any) => {
  const [authState, dispatch] = useReducer(reducer, initialState);
  const [localLoaded, setLocalLoaded] = useState(false);
  useEffect(() => {
    console.log(authState);
    if (localLoaded) {
      localForage
        .setItem("authState", {
          role: appType || authState.role,
        })
        .then((value) => {
          // do nothing
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [authState]);

  useEffect(() => {
    localForage
      .ready()
      .then(() => {
        return localForage.getItem("authState");
      })
      .then((data) => {
        dispatch({ type: AUTH_LOAD_STORED_STATE, payload: data || {} });
      })
      .catch(function (e) {
        console.log(e);
      })
      .finally(() => setLocalLoaded(true));
  }, []);

  const actions = {
    logout: async () => {
      try {
        localForage.removeItem("companyData");
        localForage.removeItem("selectedCompanyIds");
        await logout();
        dispatch({ type: AUTH_LOGOUT });
      } catch (err: any) {
        throw err?.response?.data
          ? err.response.data.responseMessage || err.response.data
          : "Please try after some time.";
      }
    },
    clearAuthState: async () => {
      try {
        dispatch({ type: AUTH_LOGOUT });
        await logoutUms();
      } catch (err: any) {
        throw err?.response?.data
          ? err.response.data.responseMessage || err.response.data
          : "Please try after some time.";
      }
    },
    signUp: async (args: any, role: any) => {
      try {
        const {
          data: {
            responseBody: { xsrfToken },
          },
        } = await authenticateUser(
          authState.state,
          authState.client_id,
          authState.redirect_url
        );

        const {
          data,
          data: {
            responseBody: { oauthCode },
          },
        } = await signUp({ ...args, xsrfToken }, role);
        if (oauthCode) {
          await generateVmsCookie(oauthCode);
        }

        if (data.responseCode === "000027") return;
        else {
          throw Error(data.responseMessage);
        }
      } catch (err: any) {
        throw err?.response?.data
          ? err.response.data.responseMessage || err.response.data
          : "Please try after some time.";
      }
    },
    login: async (...args: any[]) => {
      try {
        const {
          data: {
            responseBody: { xsrfToken, oauthCode },
          },
          data,
        } = await authenticateUser(
          authState.state,
          authState.client_id,
          authState.redirect_url
        );
        if (oauthCode) {
          dispatch({ type: AUTH_LOGIN, payload: { ...data.responseBody } });
        } else {
          const { data } = await login(args[0], args[1], xsrfToken);
          if (
            data.responseCode === "000012" ||
            data.responseCode === "000006"
          ) {
            dispatch({ type: AUTH_LOGIN, payload: { ...data.responseBody } });
          } else {
            throw Error(data.responseMessage);
          }
        }
      } catch (err: any) {
        throw (
          err?.response?.data?.responseMessage || "Please try after some time."
        );
      }
    },
    selectedCompanyId: async (companyIds: any) => {
      dispatch({
        type: UPDATE_WAREHOUSE_SELECTED_COMPANY_ID,
        payload: { selectedCompanyIds: companyIds || [] },
      });
      // Set selectedCompanyIds To local storage
      localForage
        .setItem("selectedCompanyIds", companyIds)
        .then((value) => {})
        .catch((error) => {
          console.log(error);
        });
    },
    authenticateUser: async () => {
      try {
        const { data } = await authenticateUser(
          authState.state,
          authState.client_id,
          authState.redirect_url
        );
        dispatch({
          type: AUTH_AUTHENTICATE,
          payload: {
            ...data.responseBody,
            // isLogined: ["000012", "000006"].includes(data.responseCode),
          },
        });
      } catch (err: any) {
        dispatch({ type: AUTH_AUTHENTICATE, payload: {} });
        throw err;
      }
    },
    obtainProfileData: async () => {
      try {
        const { data } = await obtainProfileData();
        dispatch({ type: OBTAIN_PROFILE_DATA, payload: data });

        return data;
      } catch (err: any) {
        throw err;
      }
    },
    changeRole: (newRole: any) =>
      dispatch({
        type: CHANGE_AUTH_ROLE,
        payload: {
          newRole,
        },
      }),
    updateProfileData: (updatedData: any) => {
      dispatch({ type: UPDATE_PROFILE_DATA, payload: { updatedData } });
    },
  };

  return (
    <AuthContext.Provider
      value={
        {
          authState: authState,
          authActions: actions,
        } as any
      }
    >
      {localLoaded && props.children}{" "}
    </AuthContext.Provider>
  );
};
export const AuthContext = React.createContext({
  authState: "authState",
  authActions: "actions",
} as any);
