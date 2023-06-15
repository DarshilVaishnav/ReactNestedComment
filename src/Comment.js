import React, { memo, useState, useRef } from "react";
import Card from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import "./Comment.css";

function Comment(props) {
  const [replyInput, setReplyInput] = useState(false);
  const [replyComment, setReplyComment] = useState("");
  const refScroll = useRef(null);
  // console.log(comment);
  const nestedComments = (props.comment.replies || []).map((comment) => {
    return (
      <div
        key={comment.id}
        style={{
          marginLeft: "50px",
          marginTop: "10px",
          marginBottom: "10px",
          clear: "right",
        }}
        ref={refScroll}
      >
        <Comment comment={comment} reply={props.reply}></Comment>
      </div>
    );
  });

  const replyHandler = () => {
    setReplyInput((prevState) => !prevState);
  };

  const commentHandler = (e) => {
    setReplyComment(e.target.value);
    // console.log(replyComment);
  };

  const addReply = () => {
    const commentRep = {
      reply_id: props.comment.id,
      comments: replyComment,
    };
    props.reply(commentRep);
    // console.log(commentRep);
    setReplyComment("");
    setReplyInput(false);
    refScroll.current?.scrollIntoView({ behavior: "smooth" });
  };

  //   const nestedComments = (props.comment || []).map((comm) => {
  //     (comm.replies || []).map((rep) => {});
  //     return (
  //       <>
  //         <Card>
  //           <p>{comm.user_id}</p>
  //           <p>{comm.comments}</p>
  //         </Card>
  //       </>
  //     );
  //   });
  return (
    <>
      <Card>
        <div style={{ marginLeft: "35px", marginTop: "15px" }}>
          <div>
            <div style={{ float: "left", marginTop: "15px" }}>
              <img
                src="img/user.png"
                alt="..."
                style={{ height: "30px", width: "30px", borderRadius: "50%" }}
              />
            </div>
            <div
              style={{
                paddingTop: "20px",
                marginLeft: "40px",
                fontFamily: "sans-serif",
                fontWeight: "bold",
                color: "darkblue",
              }}
            >
              {props.comment.username}
            </div>
          </div>
          <div
            style={{
              marginTop: "10px",
              paddingTop: "10px",
              paddingBottom: "5px",
            }}
          >
            {props.comment.comments}
          </div>
          <div
            style={{ padding: "5px", textAlign: "right", marginRight: "30px" }}
          >
            <button className="button" onClick={replyHandler}>
              <FontAwesomeIcon style={{ paddingRight: "4px" }} icon={faReply} />
              Reply
            </button>
          </div>
        </div>
      </Card>
      {replyInput && (
        <div
          style={{
            float: "right",
            margin: "10px",
            width: "70%",
          }}
        >
          <input
            type="text"
            id="comment"
            name="comment"
            onChange={commentHandler}
            placeholder="Add a comment"
            style={{
              borderRadius: "10px",
              width: "40%",
              padding: "10px",
            }}
            value={replyComment}
          />
          <button
            className="button-add"
            style={{ marginLeft: "5px" }}
            onClick={addReply}
          >
            Add
          </button>
        </div>
      )}
      {nestedComments}
    </>
  );
}
export default memo(Comment);
