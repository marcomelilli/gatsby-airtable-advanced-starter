import React, { Component } from "react";
import { Follow } from "react-twitter-widgets";
import "./UserInfo.css";

class UserInfo extends Component {
  render() {
    const { author } = this.props;
    const { expanded } = this.props;
    let authorGithub = author.github ? 'https://github.com/' + author.github : null
    let authorEmail = author.email ? ("mailto:"+author.email) : null
    return (
      <div className="author-container">
        {author.name && <span> 🙍‍♂ {author.name} </span>}
        {authorGithub && <span> 🐱<a href={authorGithub}>Github</a></span>}
        { authorEmail&& <span> ✉️<a href={authorEmail}>Email</a></span>}
        { author.twitter && <Follow
          username={author.twitter}
          options={{ count: expanded ? true : "none" }}
        /> } 
      </div>
    );
  }
}

export default UserInfo;
