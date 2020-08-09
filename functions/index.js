'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const signRequestClient = require('signrequest-client');
const OAuth2 = require('oauth').OAuth2;
const https = require('https');
admin.initializeApp();

const oauth2 = new OAuth2(
    functions.config().fb.appKey,
    functions.config().fb.appSecret,
    "https://graph.facebook.com/",
    null,
    "v2.8/oauth/access_token");

const options = {
    "redirect_url": functions.config().fb.redirectUrl
};

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
                res.status(500).json({ result: 'There was a problem.'  });
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

exports.fbAuth = functions.https.onCall((data, context, callback) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'Endpoint requires authentication!');
    }

    if (data.queryStringParameters && data.queryStringParameters.error) {
        console.log(data.queryStringParameters);
        callback(null, getFailureResponse(data.queryStringParameters));
    }
    // redirect to facebook if "code" is not provided in the query string
    else if (!event.queryStringParameters || !event.queryStringParameters.code) {
        callback(null, {
            statusCode: 302,
            headers: {
                'Location': 'https://www.facebook.com/v2.5/dialog/oauth' +
                    '?client_id=' + process.env.appKey +
                    '&redirect_uri=' + process.env.redirectUrl +
                    '&scope=email'
            }
        });
    }
    else {
        oauth2.getOAuthAccessToken(
            event.queryStringParameters.code,
            options,
            function (error, access_token, refresh_token, results) {

                if (error) {
                    console.log(error);
                    callback(null, getFailureResponse(error));
                }

                var url = "https://graph.facebook.com/me?fields=id,name,email,picture&access_token=" + access_token;

                https.get(url, function (res) {
                    console.log("got response: " + res.statusCode);

                    var body = '';

                    res.on('data', function (chunk) {
                        body += chunk;
                    });

                    res.on('end', function () {
                        var json = JSON.parse(body);
                        console.log('id', json.id);
                        console.log('name', json.name);
                        console.log('email', json.email);
                        console.log('url', json.picture.data.url);

                        // you could save/update user details in a DB here...

                        console.log('success', data);
                        callback(null, getSuccessResponse(data, process.env.appUrl));
                    });
                }).on('error', function (error) {
                    console.log(error);
                    callback(null, getFailureResponse(error));
                });
            }
        );
    }

});

function getSuccessResponse(userId, url) {
    // you could set a session cookie here (e.g. JWT token) and return it to the
    // users browser...
    var response = {
        statusCode: 302,
        headers: {
            'Location': url,
        }
    };
    return response;
}

function getFailureResponse(error) {
    // this pretty raw... were just going to return a crude error... you could
    // do something pretty here
    var response = {
        statusCode: 400,
        body: JSON.stringify(error),
    };
    return response;
}
