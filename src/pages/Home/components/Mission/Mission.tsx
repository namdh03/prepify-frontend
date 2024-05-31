import images from "~/assets/imgs";
import Container from "~/layouts/MainLayout/components/Container";

const missionList = [
  {
    title: "Quality Recipes",
    image: images.mission1st,
  },
  {
    title: "Save on Groceries",
    image: images.mission2nd,
  },
  {
    title: "Zero Food Waste",
    image: images.mission3rd,
  },
];

const Mission = () => {
  return (
    <section className="relative pt-24 pb-20 text-center bg-[#DEEDE0]">
      <Container>
        <h2>
          <span className="text-primary text-3xl uppercase">What we do</span>
          <p className="max-w-[770px] mt-4 mx-auto text-5xl font-bold">
            Chúng tôi giúp hàng nghìn người giảm lãng phí thực phẩm.
          </p>
        </h2>

        <div className="flex gap-[100px] mt-12">
          {missionList.map((mission) => (
            <article key={mission.title} className="p-10 bg-white rounded-[30px]">
              <img src={mission.image} alt={mission.title} />
              <h3 className="mt-5 text-[28px] font-medium">{mission.title}</h3>
            </article>
          ))}
        </div>
      </Container>

      <img src={images.missionBackground} alt="" className="absolute -top-36 -z-10 w-full h-full" />
    </section>
  );
};

export default Mission;
