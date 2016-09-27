import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Players = new Mongo.Collection('players');

Meteor.methods({
  'player.setAbsent' (playerId, setAbsent) {

    // Make sure the user is logged in before inserting a task
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    
    check(setAbsent, Boolean);

    Players.update(playerId, {
      $set: {
        absent: setAbsent
      }
    });
  },
});