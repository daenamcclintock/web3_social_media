import React from "react";
import "./Sidebar.css";
import { Icon } from "web3uikit";
import { Link } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { defaultBannerPics, defaultProfilePics } from "../defaultimgs";
import {Web3Api} from '@web3uikit/icons'

const Sidebar = () => {

  const { Moralis} = useMoralis();
  const user = Moralis.User.current();

  return (
    <>
      <div className="siderContent">
        <div className="menu">
          <div className="details">
            <h2>Web</h2>
            <Web3Api fill="#ffffff" fontSize={40} />
            <h2>Social</h2>
          </div>

          <Link to="/" className="link">
            <div className="menuItems">
              <Icon fill="#ffffff" size={33} svg="list" />
              Home
            </div>
          </Link>

          <Link to="/profile" className="link">
            <div className="menuItems">
              <Icon fill="#ffffff" size={33} svg="user" />
              Profile
            </div>
          </Link>

          <Link to="/settings" className="link">
            <div className="menuItems">
              <Icon fill="#ffffff" size={33} svg="cog" />
              Settings
            </div>
          </Link>
        </div>

        <div className="details">
          <img src={user.attributes.pfp ? user.attributes.pfp : defaultProfilePics[0]} className="profilePic"></img>
          <div className="profile">
            <div className="who">
              {user.attributes.username.slice(0, 6)}
            </div>
            <div className="accWhen">
              {`${user.attributes.ethAddress.slice(0, 4)}...${user.attributes.ethAddress.slice(38)}`}
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Sidebar;
