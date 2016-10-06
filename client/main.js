import angular from 'angular';
import angularMeteor from 'angular-meteor';
import playerList from '../imports/components/playerList/playerList';
import lineup from '../imports/components/lineup/lineup';
import randomButton from '../imports/components/randomButton/randomButton';
import textButton from '../imports/components/textButton/textButton';
import '../imports/startup/accounts-config.js';

angular.module('lineupApp', [
  angularMeteor,
  playerList.name,
  lineup.name,
  randomButton.name,
  textButton.name,
  'accounts.ui'
]);