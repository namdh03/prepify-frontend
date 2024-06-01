import icons from "~assets/icons";
import Ratings from "~components/common/Ratings";
import Container from "~layouts/MainLayout/components/Container";

const feedbackList = [
  {
    id: "1",
    author: "Jessica",
    description:
      "Trước đây, tôi thường vứt bỏ rau củ sắp hết hạn. Giờ đây, tôi tiết kiệm tiền và giảm thiểu lãng phí thực phẩm.",
    rate: 5,
  },
  {
    id: "2",
    author: "Mark",
    description:
      "Tôi cảm thấy mình ăn ngoài ít hơn và trở nên giỏi nấu ăn hơn nhờ sử dụng các trang web dễ sử dụng của họ.",
    rate: 5,
  },
  {
    id: "3",
    author: "Sophia",
    description: "It's easy to use! Tôi thích là tôi có thể chọn các nguyên liệu của mình",
    rate: 4,
  },
];

const Feedback = () => {
  return (
    <section className="pt-40 text-center">
      <Container>
        <h2>
          <span className="text-secondary text-3xl uppercase">What they say</span>
          <p className="max-w-[523px] mt-4 mx-auto text-5xl font-bold">Những khách hàng đã nói gì về chúng tôi?</p>
        </h2>

        <div className="mt-20 flex gap-6">
          {feedbackList.map((feedback) => (
            <article
              key={feedback.id}
              className="relative flex flex-col w-full rounded-[10px] pt-[62px] px-12 pb-10 bg-[#CFE4D2] text-left"
            >
              <img src={icons.quotationMark} alt="" className="absolute -top-5 left-[13px]" />

              <p className="mb-auto text-[#2F2E41] text-2xl leading-9">{feedback.description}</p>

              <Ratings
                rating={feedback.rate}
                size={36}
                variant="yellow"
                className="flex justify-center items-center gap-[1px] mt-14"
              />

              <h3 className="mt-4 text-2xl font-bold">-{feedback.author}</h3>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Feedback;
