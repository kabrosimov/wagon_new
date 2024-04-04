'use strict';

import { Issuer } from 'openid-client';
import { generators } from 'openid-client';
import * as https from 'https';
import * as fs from 'fs';
import { URL } from 'node:url';
import axios from 'axios';

// Node.JS server certificate;
let privateKey = fs.readFileSync('D:/PROJECTS/VS/NIIS/CERTIFICATES/pemfc.key');
let certificate = fs.readFileSync('D:/PROJECTS/VS/NIIS/CERTIFICATES/pemfc.cer');

// root CA + web services certificates;
https.globalAgent.options.ca = [];
https.globalAgent.options.ca.push(
    fs.readFileSync('D:/PROJECTS/VS/NIIS/CERTIFICATES/ca.pem'),
);
https.globalAgent.options.ca.push(
    fs.readFileSync('D:/PROJECTS/VS/NIIS/CERTIFICATES/is.pem'),
);
https.globalAgent.options.ca.push(
    fs.readFileSync('D:/PROJECTS/VS/NIIS/CERTIFICATES/api.pem'),
);

let client = null;
let code_verifier = null;
let access_token = null;

let server = https
    .createServer(
        {
            key: privateKey,
            passphrase: 'pem', // << encrypted certificate private key;
            cert: certificate,
        },
        async function (req, res) {
            let url = new URL(`http://${req.headers.host}${req.url}`);

            // home;
            if (url.pathname == '/') {
                let issuer = await Issuer.discover(
                    'https://172.17.34.40:44350',
                ); // identity server ip;
                client = new issuer.Client({
                    client_id: '80789249-76d2-45f0-9006-c49e4398fc4e',
                    client_secret: 'js',
                    redirect_uris: ['https://172.17.34.40:3000/signin-oidc'],
                    response_types: ['code'],
                });

                code_verifier = generators.codeVerifier();

                const code_challenge = generators.codeChallenge(code_verifier);

                let authUrl = client.authorizationUrl({
                    scope: 'openid profile 21d72977-8358-4bd8-b195-9a37dcf59160 244026ee-ce70-4012-8e01-6f5de0656b41',
                    code_challenge,
                    code_challenge_method: 'S256',
                });

                res.writeHead(302, { Location: authUrl });
                res.end();
            }
            // redirect from identity server;
            else if (url.pathname == '/signin-oidc') {
                let params = client.callbackParams(req);
                const tokenSet = await client.callback(
                    'https://172.17.34.40:3000/ ',
                    params,
                    { code_verifier },
                );
                access_token = tokenSet.access_token;

                res.write(JSON.stringify(tokenSet));
                res.end();
            }
            // invoke api;
            else if (url.pathname == '/api') {
                try {
                    let apiResult = await axios.get(
                        'https://172.17.34.40:44320/api',
                        {
                            headers: {
                                Version: '1.0',
                                Authorization: 'Bearer ' + access_token,
                                'x-fetch-all-individuals': '',
                            },
                        },
                    );

                    res.write(JSON.stringify(apiResult.data));
                } catch (error) {
                    console.error(error);
                }

                res.end();
            }
        },
    )
    .listen(3000, '172.17.34.40');
