import React, { Component } from "react";
import "./event_card.css";

const Event_Card = ({ event }) => {
  return (
    <div class="card-entire">
      <img src="http://placecorgi.com/310/178.34" alt="Card image cap" />
      <div class="card-interior">
        <h5 class="title-card">{event.title}</h5>
        <div class="date-event">
          <div class="location-event">{event.location}</div>
        </div>
        <div class="date-event">{event.date}</div>

        <ul class="tags">
          <li>
            <a href="#" class="tag">
              {event.tag}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Event_Card;

// <p class="card-text">
//   Some quick example text to build on the card title and make up the
//   bulk of the card's content.
// </p>
