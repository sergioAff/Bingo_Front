import * as React from "react";
import Head from "next/head";

//components
//import HostScreen from "../components/HostScreen";
import Home from "../components/Home";
import CreateHost from "../components/CreateHost";

//text content
import content from "../utils/content";

export default function Index() {
  const [path, setPath] = React.useState("home");
  const handlePath = (path) => {
    test();
    setPath(path);
  };

  const test = async () => {
    await fetch("/api/socket?option=connection");
  };

  switch (path) {
    case "create-room":
      return <CreateHost />;
    default:
      return (
        <div>
          <Head>
            <title>Bingo! - Home</title>
          </Head>
          <Home content={content.en.home} path={handlePath} />
        </div>
      );
  }
}
