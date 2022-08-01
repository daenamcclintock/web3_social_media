import React from "react";
import './Rightbar.css';
import spaceshooter from "../images/spaceshooter.jpeg";
import netflix from "../images/netflix.jpeg";
import academy from "../images/academy.png";
import youtube from "../images/youtube.png";
import js from "../images/js.png";
import { Input } from "web3uikit";
const axios = require("axios");


const Rightbar = () => {

  const options = {
    method: 'GET',
    url: 'https://web3-news-api.p.rapidapi.com/articles/hashnode',
    headers: {
      'X-RapidAPI-Key': 'd7c13f0b46mshb9d78f41c6ce57bp1dd147jsncfc4510bbaca',
      'X-RapidAPI-Host': 'web3-news-api.p.rapidapi.com'
    }
  };
  
  let newsStoriesArr = []
  const getNewsStories = () => {
    axios.request(options)
      .then(function (response) {
        console.log('this is the response data', response.data);
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].title.split(" ").length > 3 && !response.data[i].title.includes("img")) {
            newsStoriesArr.push(response.data[i])
          }
          else {
            console.log("No News Stories")
          }
        }
      })
      .then(() => {
        console.log('These are the news stories:', newsStoriesArr)
      })
      .catch(function (error) {
        console.error('this is the error', error);
      })
  }

  getNewsStories()

  // const trends = [
  //   {
  //     img: spaceshooter,
  //     text: "Learn how to build a Web3 FPS game using unity...",
  //     link: "https://moralis.io/moralis-projects-learn-to-build-a-web3-space-fps-game/",
  //   },
  //   {
  //     img: netflix,
  //     text: "The first Moralis Project! Let's Netflix and chill...",
  //     link: "https://moralis.io/moralis-projects-learn-to-build-a-web3-netflix-clone/",
  //   },
  //   {
  //     img: academy,
  //     text: "Master DeFi in 2022. Start  at the Moralis Academy...",
  //     link: "https://academy.moralis.io/courses/defi-101",
  //   },
  //   {
  //     img: js,
  //     text: "Become a Web3 Developer with just simple JS...",
  //     link: "https://academy.moralis.io/all-courses",
  //   },
  //   {
  //     img: youtube,
  //     text: "Best youtube channel to learn about Web3...",
  //     link: "https://www.youtube.com/channel/UCgWS9Q3P5AxCWyQLT2kQhBw",
  //   },
  // ];

  const trends = [
    {
      img: "",
      text: newsStoriesArr[0].title.toString(),
      link: newsStoriesArr[0].url.toString(),
    },
    {
      img: "",
      text: newsStoriesArr[1].title.toString(),
      link: newsStoriesArr[1].url.toString(),
    },
    {
      img: "",
      text: newsStoriesArr[2].title.toString(),
      link: newsStoriesArr[2].url.toString(),
    },
    {
      img: "",
      text: newsStoriesArr[3].title.toString(),
      link: newsStoriesArr[3].url.toString(),
    },
    {
      img: "",
      text: newsStoriesArr[4].title.toString(),
      link: newsStoriesArr[4].url.toString(),
    },
  ]

  return (
    <>
    <div className="rightbarContent">
      <Input
        label="Search NFT Social"
        name ="Search NFT Social"
        prefixIcon="search"
        labelBgColor="#141d26" 
        >
      </Input>

    <div className="trends">
      News Feed
      {trends.map((e) => {
          return(
            <>
            <div className="trend" onClick={() => window.open(e.link)}>
              <img src={e.img} className="trendImg"></img>
              <div className="trendText">{e.text}</div>
            </div>
            </>
          )
      })}
    </div>

    </div>
    </>
  );
};

export default Rightbar;

