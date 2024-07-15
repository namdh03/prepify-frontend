import useDocumentTitle from "~hooks/useDocumentTitle";

import Action from "./components/Action";
import Banner from "./components/Banner";
import Feedback from "./components/Feedback";
import Mission from "./components/Mission";
import Suggest from "./components/Suggest";

const Home = () => {
  useDocumentTitle("Prepify");

  return (
    <>
      <Banner />
      <Mission />
      <Suggest />
      <Feedback />
      <Action />
    </>
  );
};

export default Home;
