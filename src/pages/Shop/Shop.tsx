import images from "~assets/imgs";
import Pagination from "~components/common/Pagination";
import { Form } from "~components/ui/form";
import { LIMIT, PAGE } from "~contexts/shop/ShopContext";
import useShop from "~hooks/useShop";
import Banner from "~layouts/MainLayout/components/Banner";
import Container from "~layouts/MainLayout/components/Container";
import Product, { ProductProps } from "~layouts/MainLayout/components/Product/Product";

import OrderSort from "./components/OrderSort";
import Search from "./components/Search";
import Sidebar from "./components/Sidebar";
import breadcrumbs from "./data/breadcrumbs";

const productList: ProductProps[] = [
  {
    id: "1",
    title: "Canh bí đỏ",
    category: "Món Ăn Việt",
    mainImage: images.suggest1st,
    subImage: images.suggest2nd,
    level: "Dễ nấu",
    time: "30 phút",
    price: 15000,
    star: 5,
    sold: 1200,
  },
  {
    id: "2",
    title: "Canh bí đỏ",
    category: "Món Ăn Việt",
    mainImage: images.suggest1st,
    subImage: images.suggest2nd,
    level: "Dễ nấu",
    time: "30 phút",
    price: 15000,
    star: 5,
    sold: 1200,
  },
  {
    id: "3",
    title: "Canh bí đỏ",
    category: "Món Ăn Việt",
    mainImage: images.suggest1st,
    subImage: images.suggest2nd,
    level: "Dễ nấu",
    time: "30 phút",
    price: 15000,
    star: 5,
    sold: 1200,
  },
  {
    id: "4",
    title: "Canh bí đỏ",
    category: "Món Ăn Việt",
    mainImage: images.suggest1st,
    subImage: images.suggest2nd,
    level: "Dễ nấu",
    time: "30 phút",
    price: 15000,
    star: 5,
    sold: 1200,
  },
  {
    id: "5",
    title: "Canh bí đỏ",
    category: "Món Ăn Việt",
    mainImage: images.suggest1st,
    subImage: images.suggest2nd,
    level: "Dễ nấu",
    time: "30 phút",
    price: 15000,
    star: 5,
    sold: 1200,
  },
  {
    id: "6",
    title: "Canh bí đỏ",
    category: "Món Ăn Việt",
    mainImage: images.suggest1st,
    subImage: images.suggest2nd,
    level: "Dễ nấu",
    time: "30 phút",
    price: 15000,
    star: 5,
    sold: 1200,
  },
  {
    id: "7",
    title: "Canh bí đỏ",
    category: "Món Ăn Việt",
    mainImage: images.suggest1st,
    subImage: images.suggest2nd,
    level: "Dễ nấu",
    time: "30 phút",
    price: 15000,
    star: 5,
    sold: 1200,
  },
  {
    id: "8",
    title: "Canh bí đỏ",
    category: "Món Ăn Việt",
    mainImage: images.suggest1st,
    subImage: images.suggest2nd,
    level: "Dễ nấu",
    time: "30 phút",
    price: 15000,
    star: 5,
    sold: 1200,
  },
  {
    id: "9",
    title: "Canh bí đỏ",
    category: "Món Ăn Việt",
    mainImage: images.suggest1st,
    subImage: images.suggest2nd,
    level: "Dễ nấu",
    time: "30 phút",
    price: 15000,
    star: 5,
    sold: 1200,
  },
];

const Shop = () => {
  const { form, onSubmit } = useShop();
  const currentPage = form.watch("page") || PAGE;

  const handlePageChange = (page: number) => {
    form.setValue("page", page);
    form.handleSubmit(onSubmit)();
  };

  return (
    <>
      <Banner image={images.shopBanner} breadcrumbs={breadcrumbs} />

      <section className="pt-14 pb-20">
        <Container>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex gap-20">
                <Sidebar />

                <div className="flex-1">
                  <Search />

                  <OrderSort />

                  <div className="grid grid-cols-3 gap-x-[50px] gap-y-40 mt-32">
                    {productList.map((product) => (
                      <Product key={product.id} {...product} />
                    ))}
                  </div>

                  <Pagination
                    currentPage={currentPage}
                    pageSize={LIMIT}
                    totalCount={99}
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
