let hostName = "";
if (window.location.host === "localhost:4200") {
    hostName = "http://localhost:5000";
}
export const CommonConstants = {
    loginURL: hostName + '/login',
    signupURL: hostName + '/signup',
    feedbackURL: hostName + '/feedback'
};
