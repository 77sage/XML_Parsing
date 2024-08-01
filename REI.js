const googleapis = require("googleapis");
const fs = require("fs");

// Set credentials to account to test.

   
// Path to a local video. Update for local content if running locally.
const videoPath = "boston1.mov";

// Create YouTube client and configure authorization.
console.log("Creating YouTube client");
const youtube = createYouTubeClient(credentials);

// Upload the video
console.log("Upload youtube video test.");
const videoMetadata = {
  snippet: {
    title: "System test video script - JasonTest1",
    description: "Test video upload - JasonTestDescrip1"
  },
  status: {
    privacyStatus: "private"
  }
};

const media = {
  body: fs.createReadStream(videoPath)
};

youtube.videos
  .insert({
    part: ["snippet", "status"],
    notifySubscribers: false,
    requestBody: videoMetadata,
    media: media
  })
  .then((response) =>
    console.log(
      "Successful Upload Response here: \n" +
        JSON.stringify(response.data, null, 4)
    )
  )
  .catch((err) =>
    //console.error("Error Response here: \n" + JSON.stringify(err, null, 4))
    console.log("Error Response here: \n" + JSON.stringify(err))
  );

// NOTE: Access token is not needed here. Google API client will create and manage the access token automatically.
// Reference: https://googleapis.dev/nodejs/googleapis/latest/youtube/index.html
function createYouTubeClient(credObj) {
  const oAuthClient = new googleapis.google.auth.OAuth2(
    credObj.clientId,
    credObj.clientSecret,
    ""
  );
  oAuthClient.setCredentials({
    refresh_token: credObj.refreshToken
  });
  return googleapis.google.youtube({
    auth: oAuthClient,
    version: "v3"
  });
}
