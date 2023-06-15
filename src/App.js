import "./App.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Comment from "./Comment";

let comments = [
  {
    id: 1,
    post_id: 1,
    user_id: 1,
    comments: "Hello",
    username: "Rohit",
    reply_id: null,
    createdAt: "2019-09-04T08:40:34.000Z",
    updatedAt: "2019-09-04T08:40:34.000Z",
  },
  {
    id: 2,
    post_id: 1,
    user_id: 1,
    comments: "Hii",
    username: "Virat",
    reply_id: 1,
    createdAt: "2019-09-04T08:40:34.000Z",
    updatedAt: "2019-09-04T08:40:34.000Z",
  },
  {
    id: 3,
    post_id: 1,
    user_id: 1,
    comments: "Hey",
    username: "Hardik",
    reply_id: 1,
    createdAt: "2019-09-04T08:40:34.000Z",
    updatedAt: "2019-09-04T08:40:34.000Z",
  },
  {
    id: 4,
    post_id: 1,
    user_id: 1,
    comments: "Hey2",
    username: "Rishbh",
    reply_id: 3,
    createdAt: "2019-09-04T08:40:34.000Z",
    updatedAt: "2019-09-04T08:40:34.000Z",
  },
  {
    id: 5,
    post_id: 1,
    user_id: 1,
    comments: "OK",
    username: "Shubman",
    reply_id: 2,
    createdAt: "2019-09-04T08:40:34.000Z",
    updatedAt: "2019-09-04T08:40:34.000Z",
  },
  {
    id: 6,
    post_id: 1,
    user_id: 1,
    comments: "Hh",
    username: "Jasprit",
    reply_id: null,
    createdAt: "2019-09-04T08:40:34.000Z",
    updatedAt: "2019-09-04T08:40:34.000Z",
  },
  {
    id: 7,
    post_id: 1,
    user_id: 1,
    comments: "Hee",
    username: "Ishan",
    reply_id: 6,
    createdAt: "2019-09-04T08:40:34.000Z",
    updatedAt: "2019-09-04T08:40:34.000Z",
  },
  {
    id: 8,
    post_id: 1,
    user_id: 1,
    comments: "Hii",
    username: "Shardul",
    reply_id: 4,
    createdAt: "2019-09-04T08:40:34.000Z",
    updatedAt: "2019-09-04T08:40:34.000Z",
  },
];

function App() {
  const [commentsData, setCommentsData] = useState(comments);
  const [comment, setComment] = useState();
  const [reply, setReply] = useState({});
  const [commentChange, setCommentChange] = useState("");
  const refScrollComm = useRef(null);

  const commentHandler = useCallback(() => {
    const temp = [];
    commentsData.map((data) => {
      const filterReply = commentsData.filter(
        (comm) => comm.reply_id === data.id
      );
      //   console.log(filterReply);
      data.replies = [...filterReply];

      if (data.reply_id === null) {
        temp.push(data);
      }
    });
    setComment(temp);
  }, [commentsData]);
  // console.log(comment);
  // console.log(commentsData);

  function generateUsername(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    const res = result.charAt(0) + result.slice(1).toLowerCase();
    return res;
  }

  const commReply = (replyComm) => {
    const replyData = {
      id: commentsData.length + 1,
      username: generateUsername(5),
      ...replyComm,
    };
    if (replyData.comments) {
      setReply(replyData);
      setCommentsData((prevState) => {
        // console.log(replyData);
        return [...prevState, replyData];
      });
    }
  };

  const addCommentHandler = (e) => {
    setCommentChange(e.target.value);
  };

  const replyAdd = () => {
    const replyData = {
      id: commentsData.length + 1,
      username: generateUsername(5),
      reply_id: null,
      comments: commentChange,
    };
    if (replyData.comments) {
      setReply(replyData);
      setCommentsData((prevState) => {
        // console.log(replyData);
        return [...prevState, replyData];
      });
    }
    setCommentChange("");
    refScrollComm.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  useEffect(() => {
    commentHandler();
  }, [commentHandler]);

  // console.log(comment);
  // console.log(commentsData);
  // console.log(reply);

  return (
    <>
      <div
        style={{
          marginTop: "10px",
          marginLeft: "350px",
          width: "70%",
        }}
      >
        <input
          type="text"
          id="comment"
          name="comment"
          onChange={addCommentHandler}
          placeholder="Add a comment"
          style={{
            borderRadius: "10px",
            width: "40%",
            padding: "10px",
          }}
          value={commentChange}
        />
        <button
          className="button-add"
          style={{ marginLeft: "5px" }}
          onClick={replyAdd}
        >
          Add
        </button>
      </div>
      <div
        style={{ width: "65%", marginBottom: "20px", margin: "auto" }}
        ref={refScrollComm}
      >
        {(comment || []).map((comm) => {
          return <Comment key={comm.id} comment={comm} reply={commReply} />;
        })}
      </div>
    </>
  );
}

export default App;
