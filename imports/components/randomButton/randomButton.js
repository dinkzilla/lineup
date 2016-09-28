import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
import { Players } from '../../api/players.js';

import template from './randomButton.html';

class RandomButtonController {
  constructor($scope){
    $scope.viewModel(this);

    this.helpers({
      currentUser(){
        return Meteor.user();
      }
    });
  }

  generateLineup(){
    var activeMales = Players.find({ absent: false, gender: "Male" }).fetch();
    var activeFemales = Players.find({ absent: false, gender: "Female" }).fetch();

    //any more than twice as many males will result in a non-static lineup.
    if (activeMales.length/2 > activeFemales.length){
      throw new Meteor.Error('not-implemented');
    }

    var lineup = [];

    while(activeFemales.length > 0){
      if(activeMales.length > 1){
        for(i = 0; i < 2; i++){
          var index = Math.floor(Math.random() * (activeMales.length - 1));
          lineup.push(activeMales[index]._id);
          activeMales.splice(index,1);
        }
      } else if (activeMales.length === 1){
          var index = Math.floor(Math.random() * (activeMales.length - 1));
          lineup.push(activeMales[index]._id);
          activeMales.splice(index,1);
      }
      var femaleIndex = Math.floor(Math.random() * (activeFemales.length - 1));
       lineup.push(activeFemales[femaleIndex]._id);
      activeFemales.splice(femaleIndex,1);
    }

    while(activeMales.length > 0){
      var index = Math.floor(Math.random() * (activeMales.lenth -1));
      lineup.push(activeMales[index]._id);
      activeMales.splice(index,1);
    }

    Meteor.call("players.order", lineup);
  }
}
export default angular.module('randomButton', [
  angularMeteor
]).component('randomButton', {
    templateUrl: 'imports/components/randomButton/randomButton.html',
    controller: ['$scope', RandomButtonController]
  });