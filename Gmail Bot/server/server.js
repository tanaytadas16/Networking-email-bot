const express = require("express");
const cors = require("cors");
require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-email", (req, res) => {
    const { recipient, subject, message } = req.body;

    let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    });

    let mailDetails = {
        from: process.env.MAIL_USERNAME,
        to: recipient,
        subject: subject,
        text: message,
        attachments: [
            {
                filename: "Tanay Tadas Resume (1).pdf",
                path: "/Users/tanay/Downloads/Tanay Tadas Resume (1).pdf",
                contentType: "application/pdf",
            },
        ],
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.error(err);
            res.status(500).send("Error sending email");
        } else {
            console.log("Email sent: " + data.response);
            res.status(200).send("Email sent successfully");
        }
    });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
