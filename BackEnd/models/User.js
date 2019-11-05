const mongoose = require('mongoose');
const FolderSchema = require('./Folder').schema;
const VideoSchema = require('./Video').schema;

const UserSchema = mongoose.Schema({
    uid: String,
    folderList: [FolderSchema],
    videoList: [VideoSchema]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;