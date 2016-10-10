import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import { Players } from '../../api/players.js';

import template from './playerList.html';

class PlayerListCtrl {
  constructor($scope) {
    $scope.viewModel(this);

    this.helpers({
      players(){
        return Players.find({},{
          sort: {
            name: 1
          }
        }).fetch();
      },
      currentUser(){
        return Meteor.user();
      }
    })
  }

  // Sets the player.absent property to the opposite of its current value
  setAbsent(player) {
    Meteor.call('player.setAbsent', player._id, !player.absent);
  }

}

export default angular.module('playerList', [
  angularMeteor
]).component('playerList', {
    templateUrl: 'imports/components/playerList/playerList.html',
    controller: ['$scope', PlayerListCtrl]
  });