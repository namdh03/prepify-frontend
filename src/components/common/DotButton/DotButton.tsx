import { ButtonHTMLAttributes, DetailedHTMLProps, FC, PropsWithChildren } from "react";

type PropType = PropsWithChildren<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>>;

const DotButton: FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
};

export default DotButton;
