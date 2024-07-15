import { Fragment } from "react/jsx-runtime";
import { RxDividerVertical } from "react-icons/rx";
import { Link } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~components/ui/breadcrumb";
import { cn } from "~lib/utils";

import Container from "../Container";

export type BreadCrumbItem = {
  to: string;
  title: string;
};

interface BannerProps {
  text: JSX.Element;
  image: string;
  breadcrumbs: BreadCrumbItem[];
  className?: string;
}

const Banner = ({ text, image, breadcrumbs, className }: BannerProps) => {
  return (
    <section className={cn("pt-[77px] pb-[35px]", className)}>
      <Container>
        <div className="relative">
          <img src={image} alt="" className="absolute -top-[77px] -right-32 w-full" />

          <div className="relative inline-block">
            <div className="absolute top-0 -left-1/2 translate-x-1/2 -z-10 w-[156px] h-[152px] bg-[linear-gradient(180deg,_#34A853_52.28%,_#34A853_148.87%)] opacity-30 filter blur-[50px]"></div>
            <div className="absolute top-0 left-0 -z-10 w-[290px] h-[197px] rounded-full bg-[linear-gradient(180deg,_rgba(255,_123,_41,_0.80)_0%,_rgba(255,_123,_41,_0.80)_96.6%)] filter blur-[200px]"></div>

            {text}

            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.slice(0, breadcrumbs.length - 1).map((item) => {
                  return (
                    <Fragment key={item.to}>
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild className="font-roboto text-xl font-medium">
                          <Link to={item.to}>{item.title}</Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>

                      <BreadcrumbSeparator>
                        <RxDividerVertical size={24} />
                      </BreadcrumbSeparator>
                    </Fragment>
                  );
                })}

                <BreadcrumbItem>
                  <BreadcrumbPage className="w-60 font-roboto text-primary text-xl font-medium truncate">
                    {breadcrumbs[breadcrumbs.length - 1].title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Banner;
