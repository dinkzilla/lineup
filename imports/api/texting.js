import { Meteor } from 'meteor/meteor';
import { Players } from '../api/players.js';

// Configure the Twilio client
var twilioClient = new Twilio({
  from: Meteor.settings.TWILIO.FROM,
  sid: Meteor.settings.TWILIO.SID,
  token: Meteor.settings.TWILIO.TOKEN
});

Meteor.methods({

  'sendSMS': function (sendTo, message) {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }

    try {
      var result = twilioClient.sendSMS({
        to: sendTo,
        body: message
      });
    } catch (err) {
      throw new Meteor.Error(err);
    }
    return result;
  },

  'textPlayers': function(){
    var lineup = Players.find({
        absent: {$ne: true}
      },{
        sort: {
          order: 1
        }
      }).fetch();

    lineup.forEach(function(player, index, array){
      if(typeof player.phoneNumber !== 'undefined' && index !==0){
        let message = player.name;
        message = message.concat(', you are our number ', index + 1, ' batter, following ', array[index - 1].name,
                                 '. The full lineup can be found here: ', Meteor.settings.WEBADDRESS);
        Meteor.call("sendSMS", player.phoneNumber, message);
      } else if (typeof player.phoneNumber !== 'undefined'){
        //the first player gets a special message.
        let message = player.name;
        message = message.concat(', you bat first tonight. The last batter is ', array[array.length - 1].name,
                                 ', so you will follow them after that. The full lineup can be found here: ',
                                Meteor.settings.WEBADDRESS);
        Meteor.call("sendSMS", player.phoneNumber, message);
      }
    });



  }
});