import express from "express";
import bodyParser from 'body-parser'

import { Controller as TikTokController } from "./controller/tiktok-controller.js";
import { Controller as InstagramController } from "./controller/instagram-controller.js";

const app = express()
const port = 5000
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const tiktokController = new TikTokController()
const instagramController = new InstagramController()

app.get('/' , (req , res) => {
    res.send('Yohoo this is API')
})

app.get('/tiktok/rebotou/service' , tiktokController.encryptedDomain)
app.get('/tiktok/rebotou/dns', tiktokController.checkDomain)
app.get('/tiktok/rebotou/scripted', tiktokController.checkComments)

app.get('/instagram/pingaps/pointer' , instagramController.checkDmMessages)
app.get('/instagram/pingaps/service' , instagramController.encryptedDomain)

// port 
app.listen(port, () => {
    console.log(`Port active at ${port}`)
})

module.exports = app