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
  },

  //gets all players and returns a legal a wiffleball lineup.
  'players.randomize' (){
    var activeMales = _.shuffle(Players.find({ absent: false, gender: "Male" }).fetch());
    var activeFemales = _.shuffle(Players.find({ absent: false, gender: "Female" }).fetch());

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
          lineup.push(activeMales[0]._id);
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
});