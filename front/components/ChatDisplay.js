import * as React from "react";
import styles from "../styles/ChatDisplay.module.css";

import ChatNav from "./ChatNav";
import animations from "../utils/animations";
import { MdOutlineSend } from "react-icons/md";

export default function ChatDisplay(props) {
  const [msg, setMsg] = React.useState("");
  const [openChat, setOpenChat] = React.useState(false);
  const [oldChat, setOldChat] = React.useState(props.content.length);
  const exibLastChat = React.useRef(null);

  const handleEnter = (e) => {
    if (e.key == "Enter") {
      sendMsg();
    }
  };

  const sendMsg = () => {
    if (msg != "") {
      props.btnFunction(props.name, msg);
      setMsg("");
    }
  };

  const display_msg = (e_, idx_) => {
    switch (e_.name) {
      case "newPlayer":
        return (
          <div key={idx_} className={styles.joined}>
            <div className={styles.joined_box}>
              <p className={styles.joined_box_p}>{e_.msg}</p>
            </div>
          </div>
        );
      case "cartela":
        return (
          <div key={idx_} className={styles.msg_received}>
            <p className={styles.msg_received_p}>Your numbers are:</p>
            <p className={styles.msg_received_p}>{e_.msg.toString()}</p>
            <p className={styles.msg_received_p}>Good luck!</p>
          </div>
        );
      case "sent-200":
        return (
          <div key={idx_} className={styles.msg_sent}>
            <p>{e_.msg}</p>
          </div>
        );
      default:
        return (
          <div key={idx_} className={styles.msg_received}>
            <p className={styles.name}>{e_.name}</p>
            <p className={styles.msg_received_p}>{e_.msg}</p>
          </div>
        );
    }
  };

  const test = (open_) => {
    if (open_) {
      if (props.content.length !== oldChat && open_) {
        setOldChat(props.content.length);
        animations.scrollToEnd(exibLastChat, {
          sent: props.content[props.content.length - 1].name,
        });
      }
      return (
        <div className={`${styles.main} w-[1--dvw]`}>
          <div className={styles.display} ref={exibLastChat}>
            {props.cartela &&
              display_msg({ name: "cartela", msg: props.cartela }, 0)}
            {props.content.map((e, idx) => display_msg(e, idx + 1))}
          </div>
          <div className={`${styles.input} max-w-[97%]`}>
            <input
              className={`${styles.input_box} ml-5 mb-5`}
              type="text"
              autoComplete="off"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={handleEnter}
              placeholder="Type your message..."
            ></input>
            <button
              className={`${styles.input_btn} mb-5 pb-2`}
              onClick={sendMsg}
            >
              <MdOutlineSend className={styles.icon} />
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {props.onGame === true && (
        <>
          <ChatNav
            openChat={() => setOpenChat((prev) => !prev)}
            newMsg={props.content.length - oldChat}
            option={openChat ? "close" : "open"}
          />
          {test(openChat)}
        </>
      )}
      {!props.onGame && <>{test(true)}</>}
    </>
  );
}
