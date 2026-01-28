const { onRequest } = require("firebase-functions/v2/https");
const next = require("next");

const app = next({
  dev: false,
  conf: {
    distDir: ".next"
  }
});

const handle = app.getRequestHandler();

exports.nextServer = onRequest(
  {
    region: "us-central1",
    memory: "1GiB"
  },
  async (req, res) => {
    await app.prepare();
    return handle(req, res);
  }
);
