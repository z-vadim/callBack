angular.module('memberController', [])

    .controller('mainController', function($scope, $http, Members) {
        $scope.formData = {};

        // get all members and show them
        Members.get()
            .success(function(data) {
                $scope.members = data;
            });

        $scope.createMember = function() {

//            if (!$.isEmptyObject($scope.formData)){
                Members.create($scope.formData)
                    .success(function(data) {
                        $scope.formData = {};
                        $scope.formData.phoneNumber = '';
                        $scope.members = data;
//                        $scope.formData = {};
                    });
//            }
        };

        $scope.deleteMember = function(id) {
            Members.delete(id)
                .success(function(data) {
                    $scope.members = data;
                });
        };

    });
