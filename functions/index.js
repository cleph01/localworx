require("dotenv").config();

const { MessagingResponse } = require("twilio").twiml;

const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

const express = require("express");
const app = express();
const app2 = express();

const client = require("twilio")(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

var cors = require("cors");

// Parse JSON bodies for this app.
app.use(express.json());

app.post("/", async (request, response) => {
    const { To, From, Body, AccountSid, MessageSid, SmsSid } = request.body;

    // Create a TWIML response object to send back as SMS to sender
    const twiml = new MessagingResponse();

    switch (Body.toLowerCase()) {
        // Resubscribe Cases Here
        case "start":
            twiml.message(
                "Welcome back. Let us know how we can thank you. Message us here."
            );
            break;
        case "yes":
            twiml.message(
                "Welcome back. Let us know how we can thank you. Message us here."
            );
            break;
        case "unstop":
            twiml.message(
                "Welcome back. Let us know how we can thank you. Message us here."
            );
            break;
        // Unsubscribe Cases Here
        case "stop":
            // Locate user using cell phone number
            try {
                const doc = await admin
                    .firestore()
                    .collection("unsubscribed")
                    .doc(`${To.slice(2)}-${From.slice(2)}`)
                    .get();

                // Add Record if Record doesn't exist
                if (!doc.exists) {
                    let recordData = {
                        businessTwilioNumber: To,
                        userPhoneNumber: From,
                        created: admin.firestore.Timestamp.fromDate(new Date()),
                    };

                    await admin
                        .firestore()
                        .collection("unsubscribed")
                        .doc(`${To.slice(2)}-${From.slice(2)}`)
                        .set(recordData);

                    console.log("UnSubscribed Record Successfully Created");
                } else {
                    // OptOut Record Already Exists
                    console.log("OptOut Record Already Exists");
                }
            } catch (error) {
                // Handle Error
                console.log("Error: " + error);
            }

            break;
        case "stopall":
            // Locate user using cell phone number
            try {
                const doc = await admin
                    .firestore()
                    .collection("unsubscribed")
                    .doc(`${To.slice(2)}-${From.slice(2)}`)
                    .get();

                // Add Record if Record doesn't exist
                if (!doc.exists) {
                    let recordData = {
                        businessTwilioNumber: To,
                        userPhoneNumber: From,
                        created: admin.firestore.Timestamp.fromDate(new Date()),
                    };

                    await admin
                        .firestore()
                        .collection("unsubscribed")
                        .doc(`${To.slice(2)}-${From.slice(2)}`)
                        .set(recordData);

                    console.log("UnSubscribed Record Successfully Created");
                } else {
                    // OptOut Record Already Exists
                    console.log("OptOut Record Already Exists");
                }
            } catch (error) {
                // Handle Error
                console.log("Error: " + error);
            }

            break;
        case "unsubscribe":
            break;
        case "cancel":
            // Locate user using cell phone number
            try {
                const doc = await admin
                    .firestore()
                    .collection("unsubscribed")
                    .doc(`${To.slice(2)}-${From.slice(2)}`)
                    .get();

                // Add Record if Record doesn't exist
                if (!doc.exists) {
                    let recordData = {
                        practiceTwilioNumber: To,
                        userPhoneNumber: From,
                        created: admin.firestore.Timestamp.fromDate(new Date()),
                    };

                    await admin
                        .firestore()
                        .collection("unsubscribed")
                        .doc(`${To.slice(2)}-${From.slice(2)}`)
                        .set(recordData);

                    console.log("UnSubscribed Record Successfully Created");
                } else {
                    // OptOut Record Already Exists
                    console.log("OptOut Record Already Exists");
                }
            } catch (error) {
                // Handle Error
                console.log("Error: " + error);
            }

            break;
        case "end":
            // Locate user using cell phone number
            try {
                const doc = await admin
                    .firestore()
                    .collection("unsubscribed")
                    .doc(`${To.slice(2)}-${From.slice(2)}`)
                    .get();

                // Add Record if Record doesn't exist
                if (!doc.exists) {
                    let recordData = {
                        practiceTwilioNumber: To,
                        userPhoneNumber: From,
                        created: admin.firestore.Timestamp.fromDate(new Date()),
                    };

                    await admin
                        .firestore()
                        .collection("unsubscribed")
                        .doc(`${To.slice(2)}-${From.slice(2)}`)
                        .set(recordData);

                    console.log("UnSubscribed Record Successfully Created");
                } else {
                    // OptOut Record Already Exists
                    console.log("OptOut Record Already Exists");
                }
            } catch (error) {
                // Handle Error
                console.log("Error: " + error);
            }
            break;

        case "quit":
            // Locate user using cell phone number
            try {
                const doc = await admin
                    .firestore()
                    .collection("unsubscribed")
                    .doc(`${To.slice(2)}-${From.slice(2)}`)
                    .get();

                // Add Record if Record doesn't exist
                if (!doc.exists) {
                    let recordData = {
                        practiceTwilioNumber: To,
                        userPhoneNumber: From,
                        created: admin.firestore.Timestamp.fromDate(new Date()),
                    };

                    await admin
                        .firestore()
                        .collection("unsubscribed")
                        .doc(`${To.slice(2)}-${From.slice(2)}`)
                        .set(recordData);

                    console.log("UnSubscribed Record Successfully Created");
                } else {
                    // OptOut Record Already Exists
                    console.log("OptOut Record Already Exists");
                    twiml.message("OptOut Record Already Exists");
                }
            } catch (error) {
                // Handle Error
                console.log("Error: " + error);
            }
            break;

        case "hello":
            twiml.message("Hi!");
            break;

        case "bye":
            twiml.message("Goodbye");
            break;

        default:
            try {
                // Get businessId
                const businessQuerySnapshot = await admin
                    .firestore()
                    .collection("businesses")
                    .where("twilioNumber", "==", To)
                    .get();

                console.log("businessQuerySnapshot: ", businessQuerySnapshot);

                let businessId;

                if (businessQuerySnapshot.docs.length !== 0) {
                    businessQuerySnapshot.forEach(
                        (doc) => (businessId = doc.id)
                    );
                }

                // Check if number is in user collection
                const userQuerySnapshot = await admin
                    .firestore()
                    .collection("users")
                    .where("cellPhone", "==", From)
                    .get();

                console.log("userQuerySnapshot: ", userQuerySnapshot);

                // Commenting Out cause we'll fetch user clientside by cellphone
                // let userRef;
                // let userId = null;

                // if (userQuerySnapshot.docs.length !== 0) {
                //     userQuerySnapshot.forEach((doc) => {
                //         userRef = admin.firestore().doc(`users/${doc.id}`);

                //         userId = doc.id;
                //     });
                // }
                response.set(
                    "Set-Cookie",
                    `__session=${{
                        userCellPhone: From,
                    }};`
                );
                let convoData = {
                    businessTwilioNumber: To,
                    messageSid: MessageSid,
                    user: From.slice(2),
                    recipient: To.slice(2),
                    message: Body,
                    direction: "in",
                    timestamp: admin.firestore.Timestamp.fromDate(new Date()),
                };

                console.log("businesId: ", businessId);

                let batch = admin.firestore().batch();

                // const chatRef = admin
                //     .firestore()
                //     .collection(`businesses/${businessId}/chats`)
                //     .doc();

                const chatRef = admin
                    .firestore()
                    .collection(`businesses/${businessId}/chats`)
                    .doc(From.slice(2));

                batch.set(chatRef, { recipient: businessId });

                const messageRef = chatRef.collection("messages").doc();

                batch.set(messageRef, convoData);

                batch.commit();

                // twiml.message("Message Saved");
                console.log("message Saved");
            } catch (error) {
                twiml.message("Error Creating Conversation Record: " + error);
            }
    }

    // Send back a message that we've successfully written the message
    response.type("text/xml").send(twiml.toString());
});

exports.handleIncomingSMS = functions.https.onRequest(app);

// Parse JSON bodies for this app.
app2.use(express.json());

app2.use(cors({ origin: "*" }));
app2.post("/lookup-number", async (request, response) => {
    const { cellPhone } = request.body;

    console.log("req body: ", request.body.cellPhone);

    client.lookups.v2
        .phoneNumbers(cellPhone)
        .fetch({ fields: "line_type_intelligence" })
        .then((phone_number) => {
            response.status(200).json(phone_number.lineTypeIntelligence);
        })
        .catch((error) => {
            response.status(400).json({ error: error });
        });
});

app2.post("/available-numbers", (request, response) => {
    const { areaCode } = request.body;

    client
        .availablePhoneNumbers("US")
        .local.list({
            areaCode: areaCode,
            smsEnabled: true,
            voiceEnabled: true,
            limit: 20,
        })
        .then((local) => response.status(200).json(local))
        .catch((error) => {
            response.status(400).json({ error: error });
        });
});

app2.post("/create-subaccount", (request, response) => {
    const { businessId } = request.body;

    client.api.v2010.accounts
        .create({ friendlyName: businessId })
        .then((account) =>
            response.status(200).json({
                subaccount_sid: account.sid,
                subaccount_authToken: account.auth_token,
            })
        )
        .catch((error) => {
            response.status(400).json({ error: error });
        });
});

app2.post("/provision-twilio-number", (request, response) => {
    const { twilioNumber, subAccountSid } = request.body;

    // Provision the number under Main account first because its hard to
    // dyamically change Twilio credentials to buy/provision outright under subaccount
    client.incomingPhoneNumbers
        .create({ phoneNumber: twilioNumber })
        .then((incoming_phone_number) => {
            // Number has been provisioned under My Main Twilio Account
            console.log(incoming_phone_number.sid);
            // Now transfer it to the subaccount whose SID is being based in the body
            client
                .incomingPhoneNumbers(incoming_phone_number.sid)
                .update({ accountSid: subAccountSid })
                // This should kick out the businessId of the subAccount
                .then((incoming_phone_number) =>
                    response.status(200).json({
                        subAccount_businessId:
                            incoming_phone_number.friendlyName,
                    })
                );
        })
        .catch((error) => {
            response.status(400).json({ error: error });
        });
});

exports.handleTwilioRequests = functions.https.onRequest(app2);
