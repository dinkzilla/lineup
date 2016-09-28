import { Meteor } from 'meteor/meteor';
import { Players } from '../imports/api/players.js';
import '../imports/api/players.js';

Meteor.startup(() => {
  //stub data
  Players.remove({});
  Players.insert({
    name: "Jon M",
    absent: false,
    gender: "Male"
  });
  Players.insert({
    name: "Alex M",
    absent: false,
    gender: "Male"
  });
  Players.insert({
    name: "Lauren F",
    absent: false,
    gender: "Female"
  });
  Players.insert({
    name: "Lisa F",
    absent: false,
    gender: "Female"
  });
  Players.insert({
    name: "Kat F",
    absent: false,
    gender: "Female"
  });
  Players.insert({
    name: "Sara F",
    absent: false,
    gender: "Female"
  });
  Players.insert({
    name: "Pat M",
    absent: false,
    gender: "Male"
  });
    Players.insert({
    name: "Daniel M",
    absent: false,
    gender: "Male"
  });
  Players.insert({
    name: "Brian M",
    absent: false,
    gender: "Male"
  });
  Players.insert({
    name: "Brett M",
    absent: false,
    gender: "Male"
  });
  Players.insert({
    name: "Chris M",
    absent: false,
    gender: "Male"
  });
  Players.insert({
    name: "Sam M",
    absent: false,
    gender: "Male"
  });

});
