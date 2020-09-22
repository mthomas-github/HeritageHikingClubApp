const functions = require('firebase-functions');
const admin = require('firebase-admin');
const signRequestClient = require('signrequest-client');
admin.initializeApp();

exports.sendSignRequest = functions.https.onRequest(async (req, res) => {
    console.log('Check if request is authorized with Firebase ID token');
    if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
        !(req.cookies && req.cookies.__session)) {
        console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
            'Make sure you authorize your request by providing the following HTTP header:',
            'Authorization: Bearer <Firebase ID Token>',
            'or by passing a "__session" cookie.');
        res.status(403).send('Unauthorized');
        return;
    }


    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        console.log('Found "Authorization" header');
        // Read the ID Token from the Authorization header.
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else if (req.cookies) {
        console.log('Found "__session" cookie');
        // Read the ID Token from cookie.
        idToken = req.cookies.__session;
    } else {
        // No cookie
        res.status(403).send('Unauthorized');
        return;
    }

    try {
        await admin.auth().verifyIdToken(idToken);
        const { membersEmail, sendersName, sendersEmail } = req.body.data;
        const client = signRequestClient.ApiClient.instance;
        const _token = client.authentications["Token"];
        _token.apiKey = functions.config().sendrequest.key;
        _token.apiKeyPrefix = "Token";
        const api = new signRequestClient.SignrequestQuickCreateApi();
        const data = new signRequestClient.SignRequestQuickCreate();
        data.signers = [
            {
                "email": membersEmail,

            }
        ];
        data.from_email = sendersEmail;
        data.from_email_name = sendersName;
        data.disable_attachments = true;
        data.disable_text = true;
        data.disable_date = true;
        data.who = 'o';
        data.template = functions.config().sendrequest.templateurl;
        data.prefill_tags = [
            {
                "text": "$200.00 of your deposit is non-refundable",
                "external_id": "refundAmount1"
            },
            {
                "text": "$200.00 deposit (non-rundable)",
                "external_id": "refundAmount2"
            },
            {
                "text": "Feburary 20, 2020",
                "external_id": "datefinal"
            },
            {
                "text": "September 01, 2019",
                "external_id": "dateFirst"
            },
            {
                "text": "December 01, 2019",
                "external_id": "dateSecond"
            }
        ]


        const response = function (error, data, response) {
            if (error) {
                functions.logger.error('SignRequestClient', error);
                res.status(500).json({ result: 'There was a problem.' });
            } else {
                functions.logger.info('Send SuccessFully');
                res.status(200).json({ result: 'Email Successfuly Sent! Check Your Email' });
            }
        }
        api.signrequestQuickCreateCreate(data, response);
    } catch (error) {
        console.error('Error while verifying Firebase ID token:', error);
        res.status(403).send('Unauthorized');
        return;
    }

});
