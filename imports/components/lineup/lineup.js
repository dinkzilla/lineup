import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Players } from '../../api/players.js';

import template from './lineup.html';

class LineupCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.helpers({
      activePlayers(){
        return Players.find({
          absent: { $ne : true }
        },{
          sort: {
            order: 1
          }
        });
      }
    })
  }
}

export default angular.module('lineup', [
  angularMeteor
])
  .component('lineup', {
    templateUrl: 'imports/components/lineup/lineup.html',
    controller: ['$scope',LineupCtrl]
  });