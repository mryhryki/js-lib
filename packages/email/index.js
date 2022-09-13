const {simpleParser} = require("mailparser");

const getAddressText = (address) => {
  if (address != null) {
    return (Array.isArray(address) ? address : [address]).filter((value) => value != null).map(({text}) => text);
  }
  return [];
};

const parseEmail = (emlData) => new Promise((resolve, reject) => {
  simpleParser(emlData, {/* options */}, (err, mail) => {
    if (err) {
      reject(`Error parsing email: ${err}`);
    } else {
      const data = {
        messageId: mail.messageId,
        date: mail.date,
        subject: mail.subject,
        to: getAddressText(mail.to),
        from: mail.from?.text ?? null,
        cc: getAddressText(mail.cc),
        replyTo: mail.replyTo?.value ?? null,
        headers: mail.headerLines.reduce((header, {key, line}) => ({...header, [key]: line}), {}),
        attachments: (mail.attachments ?? []).map((attachment) => ({...attachment, content: undefined})),
        html: String(mail.html ?? "").split(/\r?\n/g),
        text: String(mail.text ?? "").split(/\r?\n/g),
      };
      resolve(data);
    }
  });
});

module.exports = {parseEmail};
