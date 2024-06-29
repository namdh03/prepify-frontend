import { useSearchParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import { GET_RECIPES_QUERY_KEY, GET_RECIPES_STALE_TIME, getRecipes } from "~apis/recipes.api";
import images from "~assets/imgs";
import Pagination from "~components/common/Pagination";
import { Form } from "~components/ui/form";
import useDocumentTitle from "~hooks/useDocumentTitle";
import useShop from "~hooks/useShop";
import Banner from "~layouts/MainLayout/components/Banner";
import Container from "~layouts/MainLayout/components/Container";
import Product from "~layouts/MainLayout/components/Product/Product";
import ProductSkeleton from "~layouts/MainLayout/components/ProductSkeleton";
import { LIMIT, PAGE } from "~utils/constants";

import OrderSort from "./components/OrderSort";
import Search from "./components/Search";
import Sidebar from "./components/Sidebar";
import breadcrumbs from "./data/breadcrumbs";

const Shop = () => {
  useDocumentTitle("Prepify | Cửa hàng");

  const [params] = useSearchParams();
  const { form, formRefs, onSubmit } = useShop();
  const currentPage = form.watch("page") || PAGE;

  const { data, isFetching } = useQuery({
    queryKey: [GET_RECIPES_QUERY_KEY, params.toString()],
    queryFn: () => getRecipes(form.getValues()),
    select: (data) => data.data.data,
    enabled: Boolean(formRefs.current),
    staleTime: GET_RECIPES_STALE_TIME,
  });

  const handlePageChange = (page: number) => {
    form.setValue("page", page);
    form.handleSubmit(onSubmit)();
  };

  return (
    <>
      <Banner
        text={
          <h1 className="mb-32 text-[54px] font-bold leading-[70px] text-[rgba(0,_0,_0,_0.85)]">
            <span>Cửa hàng của </span>
            <span className="block text-secondary">Prepify</span>
          </h1>
        }
        image={images.shopBanner}
        breadcrumbs={breadcrumbs}
        className="[&_img]:w-[868px]"
      />

      <section className="pt-28 pb-20">
        <Container>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex gap-20">
                <Sidebar />

                <div className="flex-1">
                  <Search />

                  <OrderSort />

                  <div className="grid grid-cols-3 gap-x-[50px] gap-y-40 mt-32">
                    {isFetching
                      ? Array.from({ length: LIMIT }).map((_, index) => <ProductSkeleton key={index} />)
                      : data?.recipes.map((product) => <Product key={product.id} {...product} />)}
                  </div>

                  {data?.recipes.length === 0 && (
                    <div className="flex flex-col gap-2 items-center">
                      <img src={images.lookupFail} alt="" className="w-32 h-32" />
                      <span className="text-lg text-[rgba(0,0,0,.87)]">Không tìm thấy kết quả nào</span>
                    </div>
                  )}

                  <Pagination
                    currentPage={currentPage}
                    pageSize={data?.pageSize || LIMIT}
                    totalCount={data?.itemTotal || 0}
                    onPageChange={handlePageChange}
                  />
                </div>
              </div>
            </form>
          </Form>
        </Container>
      </section>
    </>
  );
};

export default Shop;
