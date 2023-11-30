const express = require('express');
const cors = require("cors");
require("dotenv").config();

const port = 3000 || process.env.PORT;


// middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.send("Twilio-Voice-Integration application Server Running");
})
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


// const VoiceResponse = require('twilio').twiml.VoiceResponse;
// const response = new VoiceResponse();

async function run() {
    try {
        // POST request to make call
        app.post("/make-call", async (req, res) => {
            const reqBody = req.body;
            // console.log("hitted the post task API", insertItem);
            const call = await client.calls.create({
                url: 'https://handler.twilio.com/twiml/EHaef4d28c6c1c994440d3e41d5b15a089',
                to: '+8801677863720',
                from: '+14434999063'
            })
            console.log(call);
            res.json(call);
        });


    } catch (error) {
        console.log(error);
    }
}
run().catch(console.dir);