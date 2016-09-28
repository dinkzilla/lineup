import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Players = new Mongo.Collection('players');

Meteor.methods({

  //set the player.absent field for a particular player
  'player.setAbsent' (playerId, setAbsent) {

    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    check(playerId, String);
    check(setAbsent, Boolean);

    Players.update(playerId, {
      $set: {
        absent: setAbsent
      }
    });
  },

  //save the order value for all players in the order of the provided list.
  //unprovided players will have the order field removed.
  'players.order' (playersInOrder){

    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    check(playersInOrder, [String]);

    Players.update({},{
      $unset:{
        order: ""
      }},{
        multi: true
      });

    playersInOrder.forEach(function(element, index, array){
      Players.update(element, {
        $set:{
          order: index
        }
      });
    });
  }
});