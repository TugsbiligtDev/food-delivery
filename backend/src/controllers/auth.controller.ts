export const refreshToken = (request, response) => {
  response.send("auth/refresh Get huselt irlee");
};

export const signIn = (request, response) => {
  response.send("auth/sign-in Post huselt irlee");
};

export const signUp = (request, response) => {
  response.send("auth/sign-up Post huselt irlee");
};

export const resetPasswordRequest = (request, response) => {
  response.send("auth/reset-password-request Post huselt irlee");
};

export const verifyResetPasswordRequest = (request, response) => {
  response.send("auth/verify-reset-password-request Get huselt irlee");
};

export const resetPassword = (request, response) => {
  response.send("auth/reset-password Post huselt irlee");
};
