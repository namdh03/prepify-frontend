import useCookingLoading from "~hooks/useCookingLoading";

const Loading = () => {
  const { RiveComponent, onPressed } = useCookingLoading();

  return (
    <div onClick={onPressed} className="flex items-center justify-center h-screen cursor-pointer">
      <RiveComponent className="w-[600px] h-[600px]" />
    </div>
  );
};

export default Loading;
