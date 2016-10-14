# Wiffleball Lineup Generator

This is a web application to generate random legal lineups for a wiffleball team based on who will be in attendance and send text messages to the players to let them know where they fall in the batting order, who they bat after, and where they can find the full lineup (a link to this application). 

A "legal" lineup, according to the rules for which this app was created, cannot have more than two male players batting consecutively. This includes when the batting order cycles back to the beginning. Currently, if the gender of the attending players do not allow a legal standard lineup to be created (more than twice as many males as females), the application throws a "not implemented" error.

It was built in Meteor and Angular and using MongoDB. It uses Twilio to send out the text messages.

##To Do List:
- Provide details for setup and configuration in this Readme
- Replace Bootstrap (or at least slim it down to only required components)
- Implement non-standard lineup (more than twice as many males as females)
- Allow adding, editing, and removing of players
