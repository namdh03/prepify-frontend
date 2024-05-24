import { memo } from "react";
import { Link } from "react-router-dom";

import { Button } from "~/components/ui/button";

interface ButtonActionFormProps {
  mainTitle: string;
  subTitle: string;
  to: string;
}

const ButtonActionForm = memo(({ mainTitle, subTitle, to }: ButtonActionFormProps) => {
  return (
    <div className="relative top-7 flex justify-center">
      <div className="w-96">
        <Button type="submit" size={"lg"} className="w-48 text-base">
          {mainTitle}
        </Button>
        <Button type="button" variant={"link"} size={"lg"} className="text-zinc-500 text-sm">
          <Link to={to}>{subTitle}</Link>
        </Button>
      </div>
    </div>
  );
});

export default ButtonActionForm;
