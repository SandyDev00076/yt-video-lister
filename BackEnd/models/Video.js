const mongoose = require('mongoose');

const VideoSchema = mongoose.Schema({
    link: String,
    name: String,
    thumbnail: String,
    owner: String
});

const Video = mongoose.model('video', VideoSchema);

module.exports = {
    model: Video,
    schema: VideoSchema
};