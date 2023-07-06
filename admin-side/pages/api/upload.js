import multiparty from "multiparty";

// Endpoint that handles file uploading, mainly just gives back links to images after have been uploaded

async function handle(req, res) {
  const form = new multiparty.Form();

  form.parse(req, (err, fields, files) => {
    console.log("length", files.file.length);
    res.json("ah k");
  });
}

export default handle;

// This is to tell NextJS to not parse the data into JSON since we want to parse it ourselves. Because of this all the data
// as is will be retrieved.
export const config = {
  api: { bodyParser: false },
};
