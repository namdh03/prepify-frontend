import { memo, useCallback, useEffect, useState } from "react";

import { Card, CardContent } from "~components/ui/card";
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "~components/ui/carousel";
import { cn } from "~lib/utils";

import DotButton from "../DotButton";

interface ImagesProps {
  list: string[];
}

const Images = memo(({ list }: ImagesProps) => {
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [subApi, setSubApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!mainApi) {
      return;
    }

    setCurrent(mainApi.selectedScrollSnap() + 1);

    mainApi.on("select", () => {
      subApi && subApi.scrollTo(mainApi.selectedScrollSnap());
      setCurrent(mainApi.selectedScrollSnap() + 1);
    });
  }, [mainApi, subApi]);

  const scrollTo = useCallback(
    (index: number) => {
      subApi && subApi.scrollTo(index), [subApi];
      mainApi && mainApi.scrollTo(index), [mainApi];
    },
    [mainApi, subApi],
  );

  return (
    <div className="max-w-[500px]">
      <div className="w-full">
        <Carousel setApi={setMainApi}>
          <CarouselContent>
            {list.map((image, index) => (
              <CarouselItem key={index}>
                <figure className="h-[500px]">
                  <img src={image} alt="" className="w-full h-full rounded-[5px] object-cover" />
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex items-center justify-center gap-2 py-2">
          {list.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => scrollTo(index)}
              className={cn("w-6 h-1 rounded-full transition-all", {
                "bg-primary w-8": index + 1 === current,
                "bg-gray-300": index + 1 !== current,
              })}
            />
          ))}
        </div>
      </div>

      <Carousel className="w-full mt-4" setApi={setSubApi}>
        <CarouselContent className="-ml-1">
          {list.map((image, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/3 lg:basis-1/4 cursor-pointer"
              onClick={() => scrollTo(index)}
            >
              <div className="p-1">
                <Card
                  className={cn("aspect-square", {
                    "border-2 border-primary": index + 1 === current,
                  })}
                >
                  <CardContent className="flex aspect-square items-center justify-center p-2">
                    <img src={image} alt="" className="rounded-[5px] object-cover" />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
});

export default Images;
