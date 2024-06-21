import express from 'express';
import fs from 'fs';
import uuid4 from 'uuid4';


const router = express. Router();


//GET /videos
router.get ('/', (req, res) => {
    const videoData = JSON.parse (fs.readFileSync ('./data/video.json'))
    const getData = videoData.map (video => ({
        id: video.id,
        title: video.title,
        channel: video.channel,
        image: video.image
    }));
    res.json (getData)
})

//GET /videos/:id
router.get ('/:videoId', (req,res)=>{
    const {videoId}= req.params
    const videoData = JSON.parse (fs.readFileSync('./data/video.json'))
    const videoDetails = videos.find ((video)=> video.id === videoId)
    
    if (!videoDetails){
        return res.status (404).send ("Sorry, Video not found");
    }
    res.json (videoDetails);
});

//POST /VIDEOS
router.post ('/', (req, res) =>{
    const videoData = JSON.parse(fs.readFileSync('./data/videos.json'))
    const { title, description } = req.body;
    const newVideo = {
        id: uuid4(),
        title,
        channel: "Default Channel",
        image: "http://localhost:8080/images/image9.jpg",
        description,
        views: 0,
        likes: 0,
        duration,
        video: "https://unit-3-project-api-0a5620414506.herokuapp.com/stream",
        timestamp: Date.now(),
        comments: []
    };
    videoData.push (newVideo);
    fs.writeFileSync("./data/videos.json", JSON.stringify(videoData));
    res.status(201).json({message: 'Thank you for uploading a video'})
})




export default router;
