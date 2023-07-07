import multiparty from "multiparty";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import mime from "mime-types";

const bucketName = "nextjs-ecommerce-test";

// Endpoint that handles file uploading, mainly just gives back links to images after have been uploaded

export default async function handle(req, res) {
  const form = new multiparty.Form();

  form.parse(req, (err, fields, files) => {
    console.log("length", files.file.length);
    const client = new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });
    // Array that will hold the possible many links to the images uploaded
    const links = [];

    // For loop to add each file to the backend bucket
    for (const file of files.file) {
      // Grab the extension for the file name by getting the property value from it, splitting it at the period, then popping the top element
      const ext = file.originalFilename.split(".").pop();

      // TODO: Make this a more secure and unique key maybe
      const newFileName = Date.now() + "" + ext;

      console.log({ ext, file });
      client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          // In order to avoid any files having the same key, a randomly unique generated key is created using the name of the file
          Key: newFileName,
          Body: fs.readFileSync(file.path),
          ACL: "public-read",
          ContentType: mime.lookup(file.path),
        })
      );
      // Get the unique link for the image on the backend bucket
      const link = `https://${bucketName}.s3.amazonaws.com/${newFileName}`;
      // Add the link to the links array
      links.push(link);
    }

    res.json({ links });
  });
}

// This is to tell NextJS to not parse the data into JSON since we want to parse it ourselves. Because of this all the data
// as is will be retrieved.
export const config = {
  api: { bodyParser: false },
};
