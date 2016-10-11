import { Meteor } from 'meteor/meteor';
import { Players } from '../imports/api/players.js';
import { PlayerData } from '../imports/startup/initialData.js'
import '../imports/api/players.js';
import '../imports/api/texting.js';

Meteor.startup(() => {

  //load players
  Players.remove({});
  _.each(PlayerData, function(player){
    Players.insert(player);
  });

});
