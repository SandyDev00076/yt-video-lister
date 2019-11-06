const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectionString = require('./config/mongoDetails').CONNECTION_STRING;
const PORT = 2300 | process.env.PORT;
app.use(cors());
app.use(bodyParser.json());

// setting up a connection with mongo db atlas
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (!err) {
        console.log('Connection to MongoDB is successful');
    } else {
        console.log(`Connection to MongoDB is unsuccessful with error ${err.message}`);
    }
});

// setting up the routes
const Folder = require('./models/Folder').model;
const Video = require('./models/Video').model;
const User = require('./models/User');


app.post('/users', (req, res) => {
    User.findOne({ uid: req.body.uid }, (err, doc) => {
        if (!err) {
            if (doc) res.send(true);
            else res.send(false);
        } else res.send(false);
    });
});

// get all the folders of the user
app.get('/:id/folders', (req, res) => {
    User.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc.folderList);
        } else console.error(err);
    });
});

// add a folder
app.post('/:id/folders', (req, res) => {
    const newFolder = req.body.folder;
    User.findById(req.params.id, (err, doc) => {
        if (!err) {
            let newFolders = doc.folderList;
            newFolders.push(newFolder);
            User.findByIdAndUpdate(req.params.id, { folderList: newFolders }, { new: true },(err, doc) => {
                if (!err) {
                    res.send(doc.folderList);
                } else console.error(err);
            });
        } else console.error(err);
    });
});

// delete a folder
app.delete('/:id/folders/:folderid', (req, res) => {
    const toDelete = req.params.folderid;
    User.findById(req.params.id, (err, doc) => {
        if (!err) {
            let newFolders = doc.folderList;
            const indexToDelete = newFolders.findIndex(folder => folder._id == toDelete);
            newFolders.splice(indexToDelete, 1);
            User.findByIdAndUpdate(req.params.id, { folderList: newFolders }, { new: true }, (err, doc) => {
                if (!err) {
                    res.send(doc.folderList);
                } else console.error(err);
            });
        } else console.error(err);
    });
});

// get all the videos of the user
app.get('/:id/videos', (req, res) => {
    User.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc.videoList);
        } else console.error(err);
    });
});

// add a video
app.post('/:id/videos', (req, res) => {
    const newVideo = req.body.video;
    User.findById(req.params.id, (err, doc) => {
        if (!err) {
            let newVideos = doc.videoList;
            newVideos.push(newVideo);
            User.findByIdAndUpdate(req.params.id, { videoList: newVideos }, { new: true },(err, doc) => {
                if (!err) {
                    res.send(doc.videoList);
                } else console.error(err);
            });
        } else console.error(err);
    });
});

// delete a video
app.delete('/:id/videos/:vidid', (req, res) => {
    const toDelete = req.params.vidid;
    User.findById(req.params.id, (err, doc) => {
        if (!err) {
            let newVideos = doc.videoList;
            newVideos.splice(newVideos.findIndex(video => video._id === toDelete), 1);
            User.findByIdAndUpdate(req.params.id, { videoList: newVideos }, { new: true },(err, doc) => {
                if (!err) {
                    res.send(doc.videoList);
                } else console.error(err);
            });
        } else console.error(err);
    });
});

app.get('/uid/:uid', (req, res) => {
    User.findOne({ uid: req.params.uid }, (err, doc) => {
        if (!err) {
            if (doc) res.send({ id: doc._id });
            else res.send(null);
        } else console.error(err);
    });
});

app.post('/user', (req, res) => {
    const user = new User({
        uid: req.body.uid,
        folderList: [],
        videoList: []
    });
    user.save((err, doc) => {
        if (!err) {
            res.send({ id: doc._id });
        } else console.error(err);
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});