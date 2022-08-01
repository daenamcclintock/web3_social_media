import React from "react";
import "./Home.css";
import { defaultBannerPics, defaultProfilePics } from "../defaultimgs";
import { TextArea, Icon } from "web3uikit";
import { useState, useRef } from "react";
import PostInFeed from "../components/PostInFeed";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";

const Home = () => {

  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const contractProcessor = useWeb3ExecuteFunction();

  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const [theFile, setTheFile] = useState();
  const [post, setPost] = useState();

  async function maticPost() {

    if (!post) return;

    let img;
    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      img = file.ipfs();
    }else{
      img = "No Img"
    }

    let options = {
      contractAddress: "0x8E452D8573e2B1e8341D3f4aCC07939247cf99c6",
      functionName: "addPost",
      abi: [{
        "inputs": [
          {
            "internalType": "string",
            "name": "postTxt",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "postImg",
            "type": "string"
          }
        ],
        "name": "addPost",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      }],
      params: {
        postTxt: post,
        postImg: img,
      },
      msgValue: Moralis.Units.ETH(1),
    }

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        savePost();
      },
      onError: (error) => {
        console.log(error.data.message)
      }
    });

  }


  async function savePost() {

    if(!post) return;

    const Posts = Moralis.Object.extend("Posts");

    const newPost = new Posts();

    newPost.set("postTxt", post);
    newPost.set("posterPfp", user.attributes.pfp);
    newPost.set("posterAcc", user.attributes.ethAddress);
    newPost.set("posterUserName", user.attributes.username);

    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      newPost.set("postImg", file.ipfs());
    }

    await newPost.save();
    window.location.reload();

  }

  const onImageClick = () => {
    inputFile.current.click();
  };

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
  };

  const randomDefaultProfilePic = () => {
    let defaultProfilPicArray = defaultProfilePics
    let randomNum = Math.round(Math.random() * 10)
    console.log(randomNum)
    return defaultProfilePics[randomNum]
  }

  return (
    <>
    <div className="pageIdentify">Home</div>
      <div className="mainContent">
        <div className="profilePost">
          <img src={user.attributes.pfp ? user.attributes.pfp : randomDefaultProfilePic()} className="profilePic"></img>
          <div className="postBox">
            <TextArea
              label=""
              name="postTxtArea"
              value="GM World"
              type="text"
              onChange={(e) => setPost(e.target.value)}
              width="95%"
            ></TextArea>
            {selectedFile && (
              <img src={selectedFile} className="postImg"></img>
            )}
            <div className="imgOrPost">
              <div className="imgDiv" onClick={onImageClick}>
              <input
                  type="file"
                  name="file"
                  ref={inputFile}
                  onChange={changeHandler}
                  style={{ display: "none"}}
                />
                <Icon fill="#1DA1F2" size={20} svg="image"></Icon>
              </div>
              <div className="postOptions">
                <div className="post" onClick={savePost}>Post</div>
                <div className="post" onClick={maticPost} style={{ backgroundColor: "#8247e5" }}>
                  <Icon fill="#ffffff" size={20} svg="matic" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <PostInFeed profile={false}/>
      </div>
    </>
  );
};

export default Home;
