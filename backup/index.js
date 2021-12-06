const { execSync } = require("child_process");
const AWS = require("aws-sdk");
const fs = require("fs");
const cron = require('node-cron');

const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_ACCESS_SECRET;
const s3 = new AWS.S3({ accessKeyId, secretAccessKey });

async function backup() {
  const datetime = new Date().toISOString();
  const backupFile = `comments_${datetime}.db.backup`;
  console.log(execSync("sqlite3 --version").toString());
  execSync(`sqlite3 /db/comments.db ".backup '${backupFile}'" `);

  const backup = fs.readFileSync(backupFile);
  await s3.upload({ Bucket: "comments.ssdh233.me", Key: backupFile, Body: backup }).promise(); 
  console.log("Successfully finished backup!");
}

backup();
cron.schedule('0 0 0,12 * * *', () => {
  backup();
});
