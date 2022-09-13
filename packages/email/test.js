const fs = require("node:fs/promises");
const path = require("node:path");
const {parseEmail} = require("./index");

const ExpectResult = {
  "messageId": "<CACvnhqv-BSudLM5mk3uhmJZpP8nRobsew3bCUmiOpPfBCQQ1xQ@mail.gmail.com>",
  "date": "2022-09-13T13:32:38.000Z",
  "subject": "TEST",
  "to": [
    "Hiroyuki Moriya <mryhryki@gmail.com>",
  ],
  "from": "Hiroyuki Moriya <mryhryki@gmail.com>",
  "cc": [],
  "replyTo": null,
  "headers": {
    "mime-version": "MIME-Version: 1.0",
    "date": "Date: Tue, 13 Sep 2022 22:32:38 +0900",
    "message-id": "Message-ID: <CACvnhqv-BSudLM5mk3uhmJZpP8nRobsew3bCUmiOpPfBCQQ1xQ@mail.gmail.com>",
    "subject": "Subject: TEST",
    "from": "From: Hiroyuki Moriya <mryhryki@gmail.com>",
    "to": "To: Hiroyuki Moriya <mryhryki@gmail.com>",
    "content-type": "Content-Type: multipart/alternative; boundary=\"000000000000c1569105e88f0be0\"",
  },
  "attachments": [],
  "html": [
    "<div dir=\"ltr\"><b>BODY</b></div>",
    "",
  ],
  "text": [
    "*BODY*",
    "",
  ],
};


const main = async () => {
  const emlRawData = await fs.readFile(path.resolve(__dirname, "sample.eml"));
  return await parseEmail(emlRawData);
};

main()
  .then((result) => {
    console.log(JSON.stringify(result, null, 2));
    if (JSON.stringify(result) !== JSON.stringify(ExpectResult)) {
      console.error("Assertion Error!");
      process.exit(1);
    }
  })
  .catch(console.error);
