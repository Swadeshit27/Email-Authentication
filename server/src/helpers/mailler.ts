import nodemailer from "nodemailer";
import bcryptjs from "bcrypt"
import User from "../models/user.model";

export const mailer = async ({ email, emailType, userId }: any) => {
    try { 
        const hashedToken = await bcryptjs.hash(userId.toString(), 10); 
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(
                userId,
                {
                    verificationToken: hashedToken,
                    verificationTokenExpire: Date.now() + 120000,
                },
                {
                    new: true,
                }
            );
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(
                userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 120000,
                },
                {
                    new: true, 
                }
            );
        }
        const transport = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER_ID,
                pass: process.env.PASSWORD,
            },
        }); 

        const mailOption = {
            from: process.env.USER_ID,
            to: email,
            subject:
                emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p style={{fontSize:18}}>Click <a href="${process.env.DOMAIN
                }/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"
                }
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN
                }/verifyemail?token=${hashedToken}
            </p>`,
        };
        const mailResponse = await transport.sendMail(mailOption);
        // console.log(mailResponse);
        return mailResponse;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
