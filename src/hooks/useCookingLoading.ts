import { Alignment, Fit, Layout, useRive, useStateMachineInput } from "@rive-app/react-canvas";

const STATE_MACHINE_NAME = "Cooking State Machine";

const useCookingLoading = () => {
  const { rive, RiveComponent } = useRive({
    src: "/rive/cooking_loading.riv",
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
    layout: new Layout({
      fit: Fit.Cover,
      alignment: Alignment.Center,
    }),
  });
  const isPressed = useStateMachineInput(rive, STATE_MACHINE_NAME, "pressed");

  const onPressed = () => isPressed && (isPressed.value = !isPressed.value);

  return {
    RiveComponent,
    onPressed,
  };
};

export default useCookingLoading;
