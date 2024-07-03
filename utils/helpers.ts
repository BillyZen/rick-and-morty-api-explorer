export const handleSetScreen = (
  window: Window,
  setter: (value: "mobile" | "desktop") => void,
  isAddingEventListener: boolean
) => {
  if (isAddingEventListener) {
    window.innerWidth < 768 ? setter("mobile") : setter("desktop");
    window.addEventListener("mobile", () => {
      setter("mobile");
    });
    window.addEventListener("desktop", () => {
      setter("desktop");
    });
  } else {
    window.removeEventListener("mobile", () => {
      setter("mobile");
    });
    window.removeEventListener("desktop", () => {
      setter("desktop");
    });
  }
};
