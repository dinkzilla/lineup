# Wiffleball Lineup Generator

This is a web application to generate random legal lineups for a wiffleball team based on who will be in attendance and send text messages to the players to let them know where they fall in the batting order, who they bat after, and where they can find the full lineup (a link to this application). 

A "legal" lineup, according to the rules for which this app was created, cannot have more than two male players batting consecutively. This includes when the batting order cycles back to the beginning. Currently, if the gender of the attending players do not allow a legal standard lineup to be created (more than twice as many males as females), the application throws a "not implemented" error.

It was built in Meteor and Angular and using MongoDB. It uses Twilio to send out the text messages.

## Set up
- A settings.json file is required in the format below. Most metoer hosting services take this file seperately. When running locally, it should be stored in at the root level with your package.json file. The Twilio information is taken from the Twilio account which will be used to send the texts. The WEBADDRESS variable should be the address which you are hosting the site at and will be included in the text to team members.

```json
"TWILIO": {
    "FROM": "xxxx",  
    "SID": "xxxx",  
    "TOKEN": "xxxx"
},
"WEBADDRESS": "xxxx"
```

- Since currently adding, removing, and editing players is not supported in the app, the players are instead added to the database at deployment. This comes from a file called "initalData.js" which must be created within the startup folder. It should export an array of players as a constant called PlayerData. Players have a name, gender ("Male" or "Female", and phoneNumber. phoneNumbers should start with "+1" to match Twilio's prefered convention. There is no maximum number of players. At each deployment, any current players are removed before the players currently in the initalData.js file are created. An example is below:

```javascript
export const PlayerData = [
  {
    name: "Player One",
    gender: "Male",
    phoneNumber: "+15555555555"
  },
  {
    name: "Player Two",
    gender: "Female",
    phoneNumber: "+15555555555"
  },
]
```

- Since adding and removing admin users is not part of the application yet, you will need to add an admin user to the database. If you do not wish to do this directly, you can set forbidClientAccountCreation to false within the startup/accounts-config.js. After creating the desired accounts using the app, simply set the flag back to false and redeploy.

## To Do List:
- Replace Bootstrap (or at least slim it down to only required components)
- Implement non-standard lineup (more than twice as many males as females)
- Build UI for adding, editing, and removing players
- Build UI for creation of new admin users
