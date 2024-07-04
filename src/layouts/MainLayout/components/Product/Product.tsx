import { memo } from "react";
import { motion } from "framer-motion";
import { FiBarChart } from "react-icons/fi";
import { LuClock2 } from "react-icons/lu";
import { Link } from "react-router-dom";

import Ratings from "~components/common/Ratings";
import configs from "~configs";
import { ShopRecipeType } from "~types/recipe.type";
import nFormatter from "~utils/nFormatter";

/**
 *  Link to recipe detail page when BE ready
 * `${configs.routes.shop}/${props.slug}`
 */

const Product = memo((props: ShopRecipeType) => {
  return (
    <Link to={configs.routes.recipeDetail}>
      <article className="relative pt-24 px-9 pb-5 bg-white rounded-[34px] text-center [box-shadow:0px_9px_27px_0px_rgba(0,_0,_0,_0.07)]">
        <div className="absolute -top-[90px] left-1/2 -translate-x-1/2 rounded-full overflow-hidden">
          <motion.div className="flex w-[179px] h-[179px]" whileHover={{ x: "-100%" }}>
            <img src={props.mainImage} alt="" className="w-full h-full object-cover" />
            <img src={props.subImage} alt="" className="w-full h-full object-cover" />
          </motion.div>
        </div>

        <h3 className="mb-1 font-inter text-xl font-semibold text-slate-800 truncate">{props.name}</h3>
        <span className="text-xs text-slate-800 truncate">{props.foodStyle}</span>

        <div className="flex justify-center gap-3 mt-3 mb-4">
          <div className="flex items-center gap-[2px]">
            <FiBarChart size={14} className="text-primary" />
            <span className="text-[11px] text-muted-foreground">{props.level}</span>
          </div>

          <div className="flex items-center gap-[2px]">
            <LuClock2 size={14} className="text-primary" />
            <span className="text-[11px] text-muted-foreground">{props.time} phút</span>
          </div>
        </div>

        <span className="text-primary text-xl font-semibold truncate">{props.price.toLocaleString()} VNĐ</span>

        <div className="flex justify-center gap-6 mt-2">
          <Ratings rating={props.star} size={14} variant="yellow" />
          <span className="text-[13px] text-gray-500 font-semibold whitespace-nowrap">
            Đã bán {nFormatter(props.sold)}
          </span>
        </div>
      </article>
    </Link>
  );
});

export default Product;
