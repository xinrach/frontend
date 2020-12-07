import React from "react";
import ReactDOM from "react-dom";
import Header from "../NavBar/NavBar.js";
import axios from "axios";
import ErrorPage from "../ErrorPage/ErrorPage";
import Profile_Card from "../Profile_Card/Profile_Card";
import Event_Card from "../Event_Card/Event_Card";

const url =
  `http://upandcoming-env.eba-icsyb2cg.us-east-1.elasticbeanstalk.com/profile/get_events?id=`;

// const dbUrl =
// `http://upandcoming-env.eba-icsyb2cg.us-east-1.elasticbeanstalk.com/profile/`;

const dbUrl =
`http://localhost:3000/profile/`;

// `http://ec2-3-86-143-220.compute-1.amazonaws.com:3000`;
function myEvents(data) {
  return data && data.length > 0 ? (
    Repeater(data)
  ) : (
    <p id="nothing-to-see">Nothing to see here...</p>
  );
}

function myProfileArea(data) {
  return data ? (
    ProfileFormatter(data)
  ) : (
    <p id="nothing-to-see">Nothing to see here...</p>
  );
}
const ProfileFormatter = (data) => {
  console.log(data)
  return (
    <Profile_Card user={data.user} events={data.events} myEvents={data.myEvents} />

  );
};

const Repeater = (items) => {
  console.log(items)
  if (!items || items.length == 0) {
    return(<p id="nothing-to-see">Nothing to see here...</p>);
  }
  return (
    <div>
      <ul>
        <div>
          {items.map((event) => {
            return (
              <div class="individual-event">
                <Event_Card event={event} />
              </div>
            );
          })}
        </div>
      </ul>
    </div>
  );
};

class Profile extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = { isLoaded: false, data: undefined };
    this.getProfileInfo = this.getProfileInfo.bind(this);
    // this.updateProfile = this.updateProfile.bind(this)
    this.buttonRef = React.createRef();
    this.state.user = JSON.parse(localStorage.getItem("user"));
  }

  componentDidMount() {
    if (this.state.user) {
      this.getProfileInfo();
    } else {
      this.setState({isLoaded: false})
    }
    

    this._isMounted = true;
    try {
      // this.updateProfile();
    } catch (err) {
      console.log(err);
      this.setState({ isLoaded: false });
    }
  }

  async getProfileInfo() {
    console.log('get profile info')
    let config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token") 
      }
    };
    axios.get(dbUrl +'basic', config).then((res) => {
      let result = res.data
      console.log(result)
      this.setState({user: result.userProfile, events: result.userEvents, myEvents: result.myEvents, isLoaded: true})

    }).catch((err) => {
      console.log(err);
      this.setState({isLoaded: true, error: err})
    });
    
  }

  render() {
    require("./Profile.css");
    if (!this.state.user || !this.state.isLoaded) {
      console.log("Loading");
      if (this.state.error) {
        return <ErrorPage />;
      } else {
        return <div>Loading...</div>;
      }
    } else {
      let pfp = "https://i.stack.imgur.com/34AD2.jpg"
      if (this.state.user.profilepic && this.state.user.profilepic != "") {
        pfp = this.state.user.profilepic
      }
      return (
        <div className="wrapper">
          <div className="nav-bar">
            <Header />
          </div>

          <div className="eventpage-content">
            <div className="profile-personal">
              <div className="name-wrap">
                <img
                  className="profile-pic"
                  src={pfp}
                  alt=""
                />
                <div className="profile-box">

                <div className="banner">
                    <p className="banner-text">About Me</p>
                    <div>{myProfileArea({user: this.state.user, events: this.state.events, myEvents: this.state.myEvents})}</div>
                  </div>
              </div>
              </div>
            </div>
            <div className="description-wrapper">
              <div className="flex-on-myevent">
                <div className="event-type">
                  <div className="banner">
                    <p className="banner-text">My Upcoming Events</p>
                    <div>{myEvents(this.state.events.upcoming)}</div>
                  </div>
                </div>
                <div className="event-type">
                  <div className="banner">
                    <p className="banner-text">My Past Events</p>
                  </div>
                  {myEvents(this.state.events.past)}
                </div>
                <div className="event-type">
                  <div className="banner">
                    <p className="banner-text">Events Created By Me</p>
                  </div>
                  {Repeater(this.state.myEvents)}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Profile;
