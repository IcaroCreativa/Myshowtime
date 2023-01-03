import { google } from 'googleapis';

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  "530362926846-ntv01501ci1uivb3s0cceddmdr3qg8np.apps.googleusercontent.com", // Remplacez par votre ID de client
  "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", // Remplacez par votre secret de client
  'https://developers.google.com/oauthplayground' // Redirection de l'URL (ne modifiez pas cette valeur)
);

oauth2Client.setCredentials({
  refresh_token: "29ccc5298aa7874a963ca8b3b52f956b9513880c", // Remplacez par votre jeton de rafraîchissement
});

const accessToken = oauth2Client.getAccessToken();

export const mailerConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: 'cliiki.projet@gmail.com',
    clientId: "530362926846-ntv01501ci1uivb3s0cceddmdr3qg8np.apps.googleusercontent.com", // Remplacez par votre ID de client
    clientSecret:"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" , // Remplacez par votre secret de client
    refreshToken: "29ccc5298aa7874a963ca8b3b52f956b9513880c", // Remplacez par votre jeton de rafraîchissement
    accessToken,
  },
};