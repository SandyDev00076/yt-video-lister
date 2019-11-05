const mongoose = require('mongoose');

const FolderSchema = mongoose.Schema({
    name: String,
    parent: String
});

const Folder = mongoose.model('folder', FolderSchema);

module.exports = {
    model: Folder,
    schema: FolderSchema
};