const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

accountMethods = {};

accountMethods.sendForgotPasswordMail = (user) => {
    sgMail.send({
        to: user.emailId,
        from: user.emailId,
        subject: 'StackCL Password Recovery',
        text: `Your password has been reset. Your new password is ${user.password}. Use this to login to your account linked with this Email ID.`
    });
}

module.exports = accountMethods;