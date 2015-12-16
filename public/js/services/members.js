angular.module('memberService', [])
    .factory('Members', function($http) {
        return {
            get: function() {
                return $http.get('/api/members');
            },
            create: function(formData) {
                return $http.post('/api/members', formData)
            },
            delete: function(id) {
                return $http.delete('/api/members/' + id)
            }
        }
    });
