import { Link } from "react-router-dom";

import { Button } from "~/components/ui/button";
import configs from "~/configs";
import Container from "~/layouts/MainLayout/components/Container";

const Action = () => {
  return (
    <section>
      <Container>
        <div className="flex items-center gap-28 mt-[30px] p-[70px] text-5xl font-bold">
          <h2>Bạn sẵn sàng chiến đấu chống lãng phí thực phẩm chưa?</h2>
          <Link to={configs.routes.shop}>
            <Button className="px-11 h-[74px] leading-[74px] text-2xl font-semibold rounded-full">Tham gia ngay</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default Action;
