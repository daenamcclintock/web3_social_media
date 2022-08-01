import React from "react";
import "./PostInFeed.css";
import golf from "../images/golf.png";
import canoe from "../images/canoe.png";
import { defaultImgs } from "../defaultimgs";
import { Icon } from "web3uikit";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";

const PostInFeed = ({ profile }) => {
  const [postArr, setPostArr] = useState();
  const { Moralis, account } = useMoralis();

  async function getPosts() {
    try {
      const Posts = Moralis.Object.extend("Posts");
      const query = new Moralis.Query(Posts);
      if (profile) {
        query.equalTo("posterAcc", account);
      }
      const results = await query.find();

      setPostArr(results);
      console.log(results);
    } 
    catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPosts();
  }, [profile]);

  return (
    <>
      {postArr?.map((e) => {
        return (
          <>
            <div className="feedPost">
              <img src={e.attributes.posterPfp ? e.attributes.posterPfp : defaultImgs[0]} className="profilePic"></img>
              <div className="completePost">
                <div className="who">
                {e.attributes.posterUserName.slice(0, 6)}
                  <div className="accWhen">{
                        `${e.attributes.posterAcc.slice(0, 4)}...${e.attributes.posterAcc.slice(38)} · 
                        ${e.attributes.createdAt.toLocaleString('en-us', { month: 'short' })}  
                        ${e.attributes.createdAt.toLocaleString('en-us', { day: 'numeric' })}
                        `  
                      }
                      </div>
                </div>
                <div className="postContent">
                {e.attributes.postTxt}
                {e.attributes.postImg && (
                        <img
                          src={e.attributes.postImg}
                          className="postImg"
                        ></img>
                      )}
                </div>
                <div className="interactions">
                  <div className="interactionNums">
                    <Icon fill="#3f3f3f" size={20} svg="messageCircle" />
                  </div>
                  <div className="interactionNums">
                    <Icon fill="#3f3f3f" size={20} svg="star" />
                    12
                  </div>
                  <div className="interactionNums">
                    <Icon fill="#3f3f3f" size={20} svg="matic" />
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      }).reverse()}

      {/* 
      <div className="feedPost">
        <img src={defaultImgs[0]} className="profilePic"></img>
        <div className="completePost">
          <div className="who">
            Juhizzz
            <div className="accWhen">0x42..314 · 1h</div>
          </div>
          <div className="postContent">
            Nice Day Golfing Today Shot 73 (+2)
            <img src={golf} className="postImg"></img>
          </div>
          <div className="interactions">
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="messageCircle" />
            </div>
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="star" />
              12
            </div>
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="matic" />
            </div>
          </div>

        </div>
      </div>
      <div className="feedPost">
        <img src={defaultImgs[0]} className="profilePic"></img>
        <div className="completePost">
          <div className="who">
            Juhizzz
            <div className="accWhen">0x42..314 · 1h</div>
          </div>
          <div className="postContent">
            is simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book. It has survived not only five
            centuries, but also the leap into electronic typesetting, remaining
            essentially un
          </div>
          <div className="interactions">
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="messageCircle" />
            </div>
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="star" />
              12
            </div>
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="matic" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="feedPost">
        <img src={defaultImgs[0]} className="profilePic"></img>
        <div className="completePost">
          <div className="who">
            Juhizzz
            <div className="accWhen">0x42..314 · 1h</div>
          </div>
          <div className="postContent">
            Thoughts on the new Coca-Cola banana 🥤🍌 flavor?
          </div>
          <div className="interactions">
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="messageCircle" />
            </div>
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="star" />
              12
            </div>
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="matic" />
            </div>
          </div>
        </div>
      </div>
      <div className="feedPost">
        <img src={defaultImgs[0]} className="profilePic"></img>
        <div className="completePost">
          <div className="who">
            Juhizzz
            <div className="accWhen">0x42..314 · 1h</div>
          </div>
          <div className="postContent">
            Love spending time on the water 🌊🌅
            <img src={canoe} className="postImg"></img>
          </div>
          <div className="interactions">
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="messageCircle" />
            </div>
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="star" />
              12
            </div>
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="matic" />
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default PostInFeed;
