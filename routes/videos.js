import express from 'express';
import cors from 'cors';
import fs from 'fs';
import uuid4 from 'uuid4';

const app = express ();
const PORT = process.env.PORT || 8080;

app.use (cors());
app.use (express.josn());

app

.get ('/', (req, res) => {
    const videoData = JSON.parse (fs.readFileSync ('./data/video.json'))
    const getData = videoData.map (video => ({
        id: video.id,
        title: video.title,
        channel: video.channel,
        image: video.image
    }));
    res.json (getData)
})

.get ('/:videoId', (req,res)=>{
    const {videoId}= req.params
    const videoData = JSON.parse (fs.readFileSync('./data/video.json'))
    const videoDetails = videos.find ((video)=> video.id === videoId)
    
    if (!videoDetails){
        return res.status (404).send ("Sorry, the video does not exist");
    }
    res.json (videoDetails);
});


// Start the server on the specified port
app.listen(PORT, () => {
    console.log('App is running on port ', PORT);
})

