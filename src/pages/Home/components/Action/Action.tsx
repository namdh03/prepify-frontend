import { Link } from "react-router-dom";

import configs from "~/configs";
import Button from "~/layouts/MainLayout/components/Button";
import Container from "~/layouts/MainLayout/components/Container";

const Action = () => {
  return (
    <section>
      <Container>
        <div className="flex items-center gap-32 my-[30px] p-[70px] text-5xl font-bold">
          <h2>Bạn sẵn sàng chiến đấu chống lãng phí thực phẩm chưa?</h2>
          <Link to={configs.routes.shop}>
            <Button>Tham gia ngay</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default Action;
