import { memo } from "react";

import Guide from "~pages/RecipeDetail/data/Guide";

const ImplementationGuide = memo(() => {
  return (
    <section className="mt-10 px-7 py-[42px] text-[#18181B] bg-white rounded-[5px] [box-shadow:0px_4px_16px_0px_rgba(0,_0,_0,_0.07)]">
      <h2 className="text-2xl font-semibold">Hướng dẫn thực hiện</h2>
      <div className="flex gap-11 mt-[30px]">
        <Guide />

        <div className="flex-1">
          <iframe
            width="618"
            height="315"
            src="https://www.youtube.com/embed/0xAW6MAT_Wo?si=A08Pc1IxvhLddHD-"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="rounded-[5px]"
          ></iframe>
        </div>
      </div>
    </section>
  );
});

export default ImplementationGuide;
