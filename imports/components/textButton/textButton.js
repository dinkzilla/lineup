import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
//import { Texting } from '../../api/texting.js';

import template from './textButton.html';

class TextButtonController {
  constructor($scope){
    $scope.viewModel(this);

    this.helpers({
      currentUser(){
        return Meteor.user();
      }
    });
  }

  sendTexts(){
    Meteor.call('textPlayers');
  }
}
export default angular.module('textButton', [
  angularMeteor
]).component('textButton', {
    templateUrl: 'imports/components/textButton/textButton.html',
    controller: ['$scope', TextButtonController]
  });