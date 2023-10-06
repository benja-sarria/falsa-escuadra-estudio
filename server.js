const express = require("express");
const next = require("next");
const nodeCleanup = require("node-cleanup");
const nodemailer = require("nodemailer");

const port = /*  parseInt(process.env.PORT, 10) || */ 3019;
// const dev = process.env.NODE_ENV !== "production";
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.use("/static", express.static(__dirname + "/static"));

    server.get("/a", (req, res) => {
        return app.render(req, res, "/a", req.query);
    });

    server.get("/b", (req, res) => {
        return app.render(req, res, "/b", req.query);
    });

    server.all("*", (req, res) => {
        return handle(req, res);
    });
    server.listen(port, (err) => {
        if (err) {
            console.log("[ERROR]", err);
            throw err;
        }
        console.log(`> Ready on http://localhost:${port}`);
        console.log("[FOLDERS]", __dirname, process.cwd());
    });
});

nodeCleanup(function (exitCode, signal) {
    // release resources here before node exits
    console.log("[PERFORMING-CLEANUP]");

    nodeCleanup.uninstall(); // don't call cleanup handler again
    return false;
});
