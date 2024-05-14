import { useQuery } from "@tanstack/react-query";

import { getFoods } from "~/apis/food.api";
import Loading from "~/components/common/Loading";
import { Button } from "~/components/ui/button";
import useDocumentTitle from "~/hooks/useDocumentTitle";

import Banner from "./components/Banner";

const Home = () => {
  useDocumentTitle("Prepify");

  const { data: foods, isLoading } = useQuery({
    queryKey: ["food"],
    queryFn: () => getFoods(),
  });

  return (
    <>
      <Loading />
      <Banner />

      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button>MeNU</Button>

      <p>Loading: {String(isLoading)}</p>
      <ul>{foods?.data.map((food) => <li key={food.id}>{food.title}</li>)}</ul>
    </>
  );
};

export default Home;
