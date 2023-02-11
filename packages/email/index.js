const { simpleParser } = require("mailparser");

const UnknownAddress = "unkonwn-from@example.com";
const DefaultAddress = { name: null, address: UnknownAddress };

const getAddress = (address) => {
  if (address == null || !Array.isArray(address.value)) {
    return [];
  }
  return address.value.map(({ name, address }) => ({ name, address }));
};

const parseEmail = (emlData) => new Promise((resolve, reject) => {
  simpleParser(emlData, {/* options */ }, (err, mail) => {
    if (err) {
      reject(`Error parsing email: ${err}`);
    } else {
      const data = {
        messageId: mail.messageId ?? null,
        date: mail.date ?? null,
        subject: mail.subject ?? "(No Subject)",
        to: getAddress(mail.to),
        from: getAddress(mail.from)[0] || DefaultAddress,
        cc: getAddress(mail.cc),
        replyTo: mail.replyTo?.value ?? null,
        headers: mail.headerLines.reduce((header, { key, line }) => ({ ...header, [key]: line }), {}),
        attachments: (mail.attachments ?? []).map((attachment) => ({ ...attachment, content: undefined })),
        html: String(mail.html ?? "").split(/\r?\n/g),
        text: String(mail.text ?? "").split(/\r?\n/g),
      };
      resolve(data);
    }
  });
});

module.exports = { parseEmail };
