import { apiUms, apiVms } from "./index";

async function login(data: any, password: any, xsrfToken: any) {
  try {
    let authResp;

    authResp = await apiUms.post("/oauth2/authenticate", {
      email: data.email,
      phone: data.phone,
      password,
      xsrfToken,
      userLoginType: data.userLoginType,
    });

    const {
      data: {
        responseBody: { oauthCode },
      },
    } = authResp;

    await apiVms.get(
      `/cookie?oauthCode=${oauthCode}&userType=${data.userLoginType}`
    );

    return authResp;
  } catch (err) {
    throw err;
  }
}

function generateVmsCookie(oauthCode: any) {
  try {
    return apiVms.get(`/cookie?oauthCode=${oauthCode}`);
  } catch (err) {
    throw err;
  }
}

async function authenticateUser(state: any, client_id: any, redirect_url: any) {
  let authenticateData = await apiUms.get("/oauth2/authenticate", {
    params: {
      response_type: "code",
      state,
      client_id,
      redirect_url,
    },
  });

  // check if only ums cookie is expired then we have to manually remove vms cookie as well
  // This function is applied for all page except login page and signup page
  const { data } = authenticateData;
  if (
    // !["/signin", "/signup"].includes(window.location.pathname) &&
    data.responseCode === "000007"
  ) {
    try {
      await apiVms.delete("/cookie");
    } catch (e) {
      console.log("!!!!!!Error!!!!!!", e);
    }
  }

  return authenticateData;
}

async function logout(isClearCookie = true) {
  try {
    // Don't run both promises parallelly i.e. Promise.all()
    let logoutResponse = await apiUms.delete("/oauth2/logout");

    if (isClearCookie) {
      await apiVms.delete("/cookie");
      window.location.reload();
    }

    return logoutResponse;
  } catch (err) {
    throw err;
  }
}

function signUp(values: any, role: any) {
  return apiUms.post(`/ums/register/${role}`, values);
}

async function logoutUms() {
  try {
    return apiUms.delete("/oauth2/logout");
  } catch (err) {
    console.log("!!!!!!!!LogoutUms Error!!!!!!!!!!", err);
    throw err;
  }
}

export {
  login,
  authenticateUser,
  logout,
  signUp,
  generateVmsCookie,
  logoutUms,
};
