import { Outlet, useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { GET_RECIPE_DETAIL_QUERY_KEY, GET_RECIPE_DETAIL_STALE_TIME, getCustomerRecipe } from "~apis/recipe.api";
import Loading from "~components/common/Loading";
import useDocumentTitle from "~hooks/useDocumentTitle";
import NotFound from "~pages/NotFound";

// RecipeDetailGuard is a guard component that fetches the recipe detail data and renders the child components.
const RecipeDetailGuard = () => {
  const { slug } = useParams();
  const { data, isSuccess, isError, isPending } = useQuery({
    queryKey: [GET_RECIPE_DETAIL_QUERY_KEY, slug],
    queryFn: () => getCustomerRecipe(slug as string),
    enabled: !!slug,
    select: (data) => data.data.data,
    staleTime: GET_RECIPE_DETAIL_STALE_TIME,
    refetchOnWindowFocus: false,
    retry: false,
  });
  useDocumentTitle(`Prepify | ${data?.recipe?.name}`);

  if (isError) return <NotFound />;
  if (isPending) return <Loading />;

  return isSuccess && <Outlet context={data} />;
};

export default RecipeDetailGuard;
