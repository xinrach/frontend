import React, { Component } from "react";
import "./Profile_Card.css";


function getNumberEventsAttended(events) {
  let total = events.ongoing.length + events.past.length
  if (total == 1) {
    return total + ' event attended';
  }
  return total + ' events attended';
}

function getNumberEventsCreated(myEvents) {
  let total = 0;
  console.log(myEvents)
  if (myEvents != null && myEvents != undefined){
     total = myEvents.length
  }
  if (total == 1) {
    return total + ' event hosted';
  }
  return total + ' events hosted';
}

function getPopularTags(events, myEvents) {
  let str = "Favorite interests: "
  let dict = {}
  let list1 = []
  list1 = list1.concat(events.past).concat(events.ongoing).concat(events.upcoming)
  let list2 = myEvents
  // list2 = list2.concat(myEvents).concat(myEvents.ongoing).concat(myEvents.upcoming)
  console.log("getpopular")
  console.log(list1)
  // console.log(list2)
  console.log(myEvents)

  
  if (list1 != null && list1 != undefined && list1.length > 0) {
    for (let e of list1) {
      console.log("eeee")
      console.log(e)
      let tag = e.tag
      if (dict.hasOwnProperty(tag)) {
        dict[tag] = dict[tag] + 1
      } else {
        dict[tag] = 1
      }
    }
  }
  if (list2 != null && list2 != undefined && list2.length > 0) {
    for (let e of list2) {
      let tag = e.tag
      if (dict.hasOwnProperty(tag)) {
        dict[tag] = dict[tag] + 1
      } else {
        dict[tag] = 1
      }
    }
  }
  console.log(dict)
  let keysSorted = Object.keys(dict).sort(function(a,b){return dict[a]-dict[b]})
  console.log(keysSorted)
  for (let key of keysSorted) {
    str += key + ", "
  }
  
  str = str.substring(0, str.length - 2)
  return str
  
}

const Profile_Card = (props) => {
  console.log(props.user)
  console.log(props.events)
  console.log("myevents")
  console.log(props.myEvents)
  console.log("myeventsdone")

  return (
    <div>
          <div className="info-padding">
            <h5 className="title-card">Name: {props.user.realname}</h5>
            <div className="number-events">
              Username: {props.user.realname}
            </div>
            <div className="number-events">
              {getNumberEventsAttended(props.events)}
            </div>
            <div className="number-events">
              {getNumberEventsCreated(props.myEvents)}
            </div>
            <br></br>
            <div className="number-events">
              {getPopularTags(props.events, props.myEvents)}
            </div>
            {/* <div className="date-event">
              <div>Location: {props.event.location}</div>
            </div>
            <ul className="tags">
              <li className="tag">
                  {props.event.tag}
              </li>
            </ul> */}
          </div>
        </div>
  );
};

export default Profile_Card;