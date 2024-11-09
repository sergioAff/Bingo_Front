import * as React from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

import JoinForm from "./JoinForm";
import Image from "next/image";

export default function Home(props) {
  const router = useRouter();

  const handleJoinRoom = (room_, name_, option) => {
    switch (option) {
      case "join":
        router.push(`${room_}?name=${name_}`);
        break;
      case "create":
        props.path("create-room");
        break;
    }
  };

  return (
    <div className={styles.main}>
      <Image
        className={styles.img}
        src="/Logo.svg"
        alt=""
        width={100}
        height={100}
      ></Image>
      <JoinForm type="home" btnFunction={handleJoinRoom} />
    </div>
  );
}
