//import { useState } from "react";

//styles
import styles from "../styles/ChatNav.module.css";

export default function ChatNav(props) {
  return (
    <section className={styles.main}>
      {props.option == "open" && (
        <div className={styles.box} onClick={props.openChat}>
          <div className={styles.pop}>{props.newMsg}</div>
          {">"}
        </div>
      )}
      {props.option == "close" && (
        <div className={styles.box} onClick={props.openChat}>
          {"<"}
        </div>
      )}
    </section>
  );
}
