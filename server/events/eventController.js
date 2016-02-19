var randomWords = require('random-words');
var Event = require('./eventModel.js');

module.exports = {
  newEvent: function(req, res) {
    var event_name = req.body.event_name;
    var location = req.body.location;
    var event_id = randomWords({exactly: 2}).join(""); //generate two random word to make it as event_id

    

    Event.findOne({event_id: event_id}, function(err, event) { //check to see if event id exists
      if(err) {
        return console.error(err);
      }      
      //create new event if event doesn't exist
      if(!event) {
        Event.create({
          event_id: event_id,
          event_name: event_name,
          location: location
        }, function(err, event) {
          if(err) {
            return console.error(err);
          }
          res.json(event);  //send newly created event object to client
        });
      } else { //if randomly generated event_id already exist within db on create event call
          return newEvent(req, res); //re-run function to get new event_id; 
      }
    });
  },
  getEvent: function(req, res) {
    //when user connects with events_id url that's created
    var event_id = req.params.events_id;
    //return data with same event_id
    Events.findOne({event_id: event_id}, function(err, event) {
      if(err) {
        return console.error(err);
      }
      res.json(event);
    });
  }
};