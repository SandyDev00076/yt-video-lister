module.exports = function($scope) {
    $scope.videoList = [];
    $scope.folderList = [];
    $scope.currentFolder = '';

    $scope.addAFolder = (name) => {
        if (name) {
            $scope.folderList.push({
                name,
                parent: $scope.currentFolder
            });
        }
    }

    $scope.addAVideo = (link) => {
        if (link) {
            $scope.videoList.push({
                link,
                owner: $scope.currentFolder
            });
        }
    }
}