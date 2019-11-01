module.exports = function($scope) {
    $scope.videoList = [];
    $scope.folderList = [];
    $scope.currentFolder = '';
    $scope.videoUrl = '';
    $scope.videoName = '';
    $scope.folderName = '';

    $scope.addAFolder = (name) => {
        if (name) {
            $scope.folderName = '';
            $scope.folderList.push({
                name,
                parent: $scope.currentFolder
            });
        }
    }

    $scope.addAVideo = (link, name) => {
        if (link && name) {
            $scope.videoUrl = '';
            $scope.videoName = '';
            $scope.videoList.push({
                link,
                name,
                owner: $scope.currentFolder
            });
        }
    }
}