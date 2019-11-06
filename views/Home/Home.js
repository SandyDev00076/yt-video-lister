const youtubeThumbnail = require('youtube-thumbnail');
const baseUrl = require('../config').baseUrl;

module.exports = function($scope, $http, $rootScope) {
    $scope.videoList = [];
    $scope.folderList = [];
    $scope.currentFolder = '';
    $scope.videoUrl = '';
    $scope.videoTN = '';
    $scope.videoName = '';
    $scope.folderName = '';
    $scope.currPath = 'Choose a Folder';

    $http.get(`${baseUrl}${$rootScope.userid}/folders`).then(res => {
        $scope.folderList = res.data;
    });

    $http.get(`${baseUrl}${$rootScope.userid}/videos`).then(res => {
        $scope.videoList = res.data;
    });

    $scope.addAFolder = (name) => {
        if (name && checkFolderName(name)) {
            $scope.folderName = '';
            $http.post(`${baseUrl}${$rootScope.userid}/folders`, { folder: {
                name,
                parent: $scope.currentFolder
            } }).then(res => {
                $scope.folderList = res.data;
            });
            // $scope.folderList.push({
            //     name,
            //     parent: $scope.currentFolder
            // });
        }
    }

    $scope.addAVideo = (link, name) => {
        if (link && name && checkVideoName(name)) {
            if (checkAndAddThumbnail(link)) {
                $scope.videoUrl = '';
                $scope.videoName = '';
                $http.post(`${baseUrl}${$rootScope.userid}/videos`, { video: {
                    link,
                    name,
                    thumbnail: $scope.videoTN,
                    owner: $scope.currentFolder
                } }).then(res => {
                    $scope.videoList = res.data;
                });
                // $scope.videoList.push({
                //     link,
                //     name,
                //     thumbnail: $scope.videoTN,
                //     owner: $scope.currentFolder
                // });
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
        if ($scope.currentFolder !== '') {
            $scope.currentFolder = $scope.folderList.find(folder => folder.name === $scope.currentFolder).parent;
            let paths = $scope.currPath.split(' / ');
            paths.pop();
            if (paths.length === 0) {
                $scope.currPath = 'Choose a Folder';
            } else {
                $scope.currPath = paths.join(' / ');
            }
        }
    }

    $scope.deleteFolder = (id, event) => {
        if (event) event.stopPropagation();
        $http.delete(`${baseUrl}${$rootScope.userid}/folders/${id}`).then(res => {
            $scope.folderList = res.data;
        });
        // $scope.folderList.splice($scope.folderList.findIndex(folder => folder.name === name), 1);
    }

    $scope.deleteVideo = (id, event) => {
        if (event) event.stopPropagation();
        $http.delete(`${baseUrl}${$rootScope.userid}/videos/${id}`).then(res => {
            $scope.videoList = res.data;
        });
        // $scope.videoList.splice($scope.videoList.findIndex(vid => vid.name === name), 1);
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