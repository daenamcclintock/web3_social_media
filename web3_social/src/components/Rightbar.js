import React from "react";
import './Rightbar.css';
import vitalik from "../images/vitalik.png"
import spacebar from "../images/spacebar.png"
import messari from "../images/messari.png"
import web3 from "../images/web3.png"
import socios from "../images/socios.png"
import { Input } from "web3uikit";
const axios = require("axios");


const Rightbar = () => {

  // const options = {
  //   method: 'GET',
  //   url: 'https://web3-news-api.p.rapidapi.com/articles/hashnode',
  //   headers: {
  //     'X-RapidAPI-Key': 'd7c13f0b46mshb9d78f41c6ce57bp1dd147jsncfc4510bbaca',
  //     'X-RapidAPI-Host': 'web3-news-api.p.rapidapi.com'
  //   }
  // };

  // let newsStoriesArr = []
  // const getNewsStories = () => {
  //   axios.request(options)
  //     .then(function (response) {
  //       console.log('this is the response data', response.data);
  //       for (let i = 0; i < response.data.length; i++) {
  //         if (response.data[i].title.split(" ").length > 3 && !response.data[i].title.includes("img")) {
  //           newsStoriesArr.push(response.data[i])
  //         }
  //         else {
  //           console.log("No News Stories")
  //         }
  //       }
  //     })
  //     .then(() => {
  //       console.log('These are the news stories:', newsStoriesArr)
  //     })
  //     .catch(function (error) {
  //       console.error('this is the error', error);
  //     })
  // }

  // getNewsStories()

  const trends = [
    {
      img: vitalik,
      text: "Ethereum creator dumps cold water on Zuckerberg’s Web3 dreams",
      link: "https://fortune.com/2022/08/01/ethereum-vitalik-buterin-dumps-cold-water-on-mark-zuckerberg-web3-metaverse-dreams/",
    },
    {
      img: spacebar,
      text: "AO Labs raises $4.5M for its Spacebar community-driven Web3 gaming platform",
      link: "https://venturebeat.com/2022/08/02/ao-labs-has-raised-4-5m-for-its-spacebar-community-driven-web3-gaming-platform/",
    },
    {
      img: messari,
      text: "Crypto Intelligence Firm Messari Acquires Web3’s Version of Crunchbase",
      link: "https://www.coindesk.com/business/2022/08/02/crypto-intelligence-firm-messari-acquires-web3s-version-of-crunchbase/",
    },
    {
      img: web3,
      text: "What is web3, and why are people talking about it?",
      link: "https://www.bostonglobe.com/2022/08/01/business/what-is-web3-why-are-people-talking-about-it/",
    },
    {
      img: socios,
      text: "Socios Invests $100M To Accelerate FC Barcelona’s Web3 Strategy",
      link: "https://watcher.guru/news/socios-invests-100m-to-accelerate-fc-barcelonas-web3-strategy",
    },
  ];

  // const trends = [
  //   {
  //     img: "",
  //     text: newsStoriesArr[0].title.toString(),
  //     link: newsStoriesArr[0].url.toString(),
  //   },
  //   {
  //     img: "",
  //     text: newsStoriesArr[1].title.toString(),
  //     link: newsStoriesArr[1].url.toString(),
  //   },
  //   {
  //     img: "",
  //     text: newsStoriesArr[2].title.toString(),
  //     link: newsStoriesArr[2].url.toString(),
  //   },
  //   {
  //     img: "",
  //     text: newsStoriesArr[3].title.toString(),
  //     link: newsStoriesArr[3].url.toString(),
  //   },
  //   {
  //     img: "",
  //     text: newsStoriesArr[4].title.toString(),
  //     link: newsStoriesArr[4].url.toString(),
  //   },
  // ]

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

