import express from "express";
import cors from "cors";
import * as dbConnect from "./dbconnect.js";
import textData from "./storage.js";

//------------------Server Settings--------------------------------->
const server = {
    port: 3000,
    hostname: "127.0.0.1"
};

const app = express();
app.use(express.static("dist"));
app.use(cors());

//------------------Page Routes-------------------------------------->
app.get('/get-db/:dbName', async (req, res) => {
    const dbName = req.params.dbName;
    try {
        const data = await dbConnect.getDatabase(dbName);
        res.json(data);
    } catch (err) {
        res.send("Cant Load DB", err);
    };
});
//------------------Text Routes-------------------------------------->
app.get('/main-text', (req, res) => {
    res.json([
        {header: textData.headerText},
        {text: textData.text}
    ]);
});

app.listen(server.port, server.hostname, () => {
    console.log(`Server is running on http://${server.hostname}:${server.port}`);
});