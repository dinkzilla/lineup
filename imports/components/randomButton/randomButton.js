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
    Meteor.call("players.randomize");
  }
}
export default angular.module('randomButton', [
  angularMeteor
]).component('randomButton', {
    templateUrl: 'imports/components/randomButton/randomButton.html',
    controller: ['$scope', RandomButtonController]
  });