var app = angular.module( 'contact', [ 'ui.router'] );
var getRandom = function() {
  return Math.floor(Math.random()*15) + 1;
};
app.service( 'data', function() {
  this.contacts = [
      {
        id: 1,
        src: getRandom(),
        name : 'Terrence S. Hatfield',
        tel: '651-603-1723',
        email: 'TerrenceSHatfield@rhyta.com'
        
      },
      {
        id: 2,
        src: getRandom(),
        name : 'Chris M. Manning',
        tel: '513-307-5859',
        email: 'ChrisMManning@dayrep.com'
        
      },
      {
        id: 3,
        src: getRandom(),
        name : 'Ricky M. Digiacomo',
        tel: '918-774-0199',
        email: 'RickyMDigiacomo@teleworm.us'
        
      },
      {
        id: 4,
        src: getRandom(),
        name : 'Michael K. Bayne',
        tel: '702-989-5145',
        email: 'MichaelKBayne@rhyta.com'
        
      },
      {
        id: 5,
        src: getRandom(),
        name : 'John I. Wilson',
        tel: '318-292-6700',
        email: 'JohnIWilson@dayrep.com'
        
      },
      {
        id: 6,
        src: getRandom(),
        name : 'Rodolfo P. Robinett',
        tel: '803-557-9815',
        email: 'RodolfoPRobinett@jourrapide.com'

      }
    ];
    
} )  
app.config(function($stateProvider, $urlRouterProvider) {
$urlRouterProvider.otherwise('/contacts');
$stateProvider
    .state('contacts', {
        url: "/contacts",
        templateUrl: 'all-contacts',
        controller: [
          '$scope',
          'data',
          function(
              $scope,
              data
          ) {
            $scope.contacts = data.contacts;

            $scope.delete = function( index ) {
              if( confirm( 'Are you sure do you want to delete?' ) ) {
                data.contacts.splice( index, 1 );
              }
            };

          
          }
        ]
    })
    .state('add', {
        url: "/add",
        templateUrl: 'contact-form',
        controller: [
          '$scope',
          'data',
          '$state',
          function(
            $scope,
            data,
            $state
          ) {
            $scope.formName = "Add contact";
            $scope.item ={};
            $scope.submit = function( e ) {
              e.preventDefault();
              if( $scope.addContactForm.$valid ) {
                $scope.item.src = getRandom();
                $scope.id = data.counter;
                data.counter++;
                data.contacts.push( $scope.item );
                $state.go( 'contacts' ); 
              }
            }
          }
        ]
    })
    .state('edit', {
        url: "/edit/:id",
        templateUrl: 'contact-form',
        controller: [
          '$scope',
          'data',
          '$state',
          '$stateParams',
          function( $scope, data, $state, $stateParams ) {
            $scope.formName = "Edit contact";
            var index = -1;

            for( var i in data.contacts ) {
              if( data.contacts[i].id == $stateParams.id ) {
                index = i;
              }
            } 
            if( index !== -1 ) {
              $scope.item = angular.copy( data.contacts[ index ] );  
            } else {
              alert( 'contact Not found');
              $state.go( 'contacts' );
            }
            $scope.submit = function( e ) {
              e.preventDefault();
              if( $scope.addContactForm.$valid ) {
                data.contacts[ index ] = $scope.item;
                $state.go( 'contacts' ); 
              }
            }
          }
        ]
    });
});

angular.bootstrap( document, [ 'contact' ]);

        