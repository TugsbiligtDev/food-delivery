export const getAuthRef = (request, response) => {
  response.send("/auth/refresh Get huselt irlee");
};

export const createSignIn = (request, response) => {
  response.send("/auth/sign-in Post huselt irlee");
};

export const createSignUp = (request, response) => {
  response.send("/auth/sign-up Post huselt irlee");
};
export const createPassReq = (request, response) => {
  response.send("/auth/reset-password-request Post huselt irlee");
};

export const getVerifyResetPass = (request, response) => {
  response.send("/auth/verify-reset-password-request Get huselt irlee");
};

export const resPass = (request, response) => {
  response.send("/auth/reset-password Post huselt irlee");
};
