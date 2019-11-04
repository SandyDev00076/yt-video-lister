const youtubeThumbnail = require('youtube-thumbnail');

module.exports = function($scope) {
    $scope.videoList = [];
    $scope.folderList = [];
    $scope.currentFolder = '';
    $scope.videoUrl = '';
    $scope.videoTN = '';
    $scope.videoName = '';
    $scope.folderName = '';
    $scope.currPath = 'Choose a Folder';

    $scope.addAFolder = (name) => {
        if (name && checkFolderName(name)) {
            $scope.folderName = '';
            $scope.folderList.push({
                name,
                parent: $scope.currentFolder
            });
        }
    }

    $scope.addAVideo = (link, name) => {
        if (link && name && checkVideoName(name)) {
            if (checkAndAddThumbnail(link)) {
                $scope.videoUrl = '';
                $scope.videoName = '';
                $scope.videoList.push({
                    link,
                    name,
                    thumbnail: $scope.videoTN,
                    owner: $scope.currentFolder
                });
                $scope.videoTN = '';
            }
        }
    }

    $scope.goToVideo = (link) => {
        window.open(link,'_blank');
    }

    $scope.openAFolder = (name) => {
        $scope.currPath = ($scope.currentFolder === '') ? name : `${$scope.currPath} / ${name}`;
        $scope.currentFolder = name;
    }

    $scope.goBack = () => {
        $scope.currentFolder = $scope.folderList.find(folder => folder.name === $scope.currentFolder).parent;
        let paths = $scope.currPath.split(' / ');
        paths.pop();
        if (paths.length === 0) {
            $scope.currPath = 'Choose a Folder';
        } else {
            $scope.currPath = paths.join(' / ');
        }
    }

    $scope.deleteFolder = (name) => {
        $scope.folderList.splice($scope.folderList.findIndex(folder => folder.name === name), 1);
    }

    $scope.deleteVideo = (name) => {
        $scope.videoList.splice($scope.videoList.findIndex(vid => vid.name === name), 1);
    }

    checkAndAddThumbnail = (link) => {
        let thumbnailUrl = '';
        try {
            thumbnailUrl = youtubeThumbnail(link);
            $scope.videoTN = thumbnailUrl.default.url;
            return true;
        } catch(err) {
            console.log(err);
            return false;
        }
    }

    checkFolderName = (name) => {
        return $scope.folderList.findIndex(folder => folder.name === name) < 0;
    }

    checkVideoName = (name) => {
        return $scope.videoList.findIndex(video => video.name === name) < 0;
    }
}