let hostName = "";
if (window.location.host === "localhost:4200") {
    hostName = "http://localhost:5000";
}
export const CommonConstants = {
    loginURL: hostName + '/login',
    loginByToken: hostName + '/loginByToken',
    signupURL: hostName + '/signup',
    forgotPasswordURL: hostName + '/forgotPassword',
    removeProfilePicture: hostName + '/removeProfilePicture',
    setProfilePicture: hostName + '/setProfilePicture',
    feedbackURL: hostName + '/feedback',
    getDbInfo: hostName + '/dbInfo',
    checkUserNameAvailability: hostName + '/checkUserNameAvailability',
    deleteFeedback: hostName + '/deleteFeedback',
    logoutURL: hostName + '/logout',
    logoutSessionsURL: hostName + '/logoutAllSessions',
    deleteUserURL: hostName + '/deleteUser',
    updateProfile: hostName + '/updateProfile'
};
