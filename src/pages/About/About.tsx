import useDocumentTitle from "~/hooks/useDocumentTitle";

import Member from "./components/Member";

const About = () => {
  useDocumentTitle("About");

  return (
    <>
      <Member />
      <Member />
      <Member />
      <Member />
      <Member />
    </>
  );
};

export default About;
