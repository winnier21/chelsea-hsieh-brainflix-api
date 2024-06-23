import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// Middleware to parse JSON
router.use(express.json());

//GET /videos
router.get("/", (req, res) => {
  const videoData = JSON.parse(fs.readFileSync("./data/video.json"));
  const getData = videoData.map((video) => ({
    id: video.id,
    title: video.title,
    channel: video.channel,
    image: video.image,
  }));
  res.json(getData);
});

//GET /videos/:id
router.get("/:videoId", (req, res) => {
  const { videoId } = req.params;
  try {
    const videoData = JSON.parse(fs.readFileSync("./data/video.json"));
    const videoDetails = videoData.find((video) => video.id === videoId);

    if (!videoDetails) {
      return res.status(404).send("Sorry, Video not found");
    }
    res.json(videoDetails);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Error reading video data file");
  }
});

//POST /VIDEOS
router.post("/", (req, res) => {
  const videoData = JSON.parse(fs.readFileSync("./data/video.json"));
  const { title, description } = req.body;

  const newVideo = {
    id: uuidv4(),
    title,
    channel: "Default Channel",
    image: "images/image9.jpg",
    description,
    views: 0,
    likes: 0,
    duration: "0:00",
    video: "https://unit-3-project-api-0a5620414506.herokuapp.com/stream",
    timestamp: Date.now(),
    comments: [],
  };
  videoData.push(newVideo);
  fs.writeFileSync("./data/video.json", JSON.stringify(videoData));
  res.status(201).json({ message: "Thank you for uploading a video" });
});

router.post("/:videoId/comments", (req, res) => {
  const videoData = JSON.parse(fs.readFileSync("./data/video.json"));
  const videoId = req.params.videoId;

  const newComments = {
    id: uuidv4(),
    name: req.body.name,
    comment: req.body.comment,
    timestamp: Date.now(),
  };

  const video = videoData.find((video) => video.id === videoId);

  if (video) {
    video.comments.push(newComments);
    fs.writeFileSync("./data/video.json", JSON.stringify(videoData));
    res.status(201).json({ message: "Comment added succesfully" });
  } else {
    res.status(404).json({ message: "Video not found" });
  }
});

export default router;
