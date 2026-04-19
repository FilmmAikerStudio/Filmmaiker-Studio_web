
import { useThemeStore } from "@/app/stores";
import { Stars } from "@react-three/drei";
import { isMobile } from "react-device-detect";

const StarsContainer = () => {
  const isDarkTheme = useThemeStore((state) => state.theme.type === 'dark');

  if (!isDarkTheme) return null;

  return (
    <Stars radius={200} depth={100} count={isMobile ? 1500 : 5000} factor={10} saturation={10} fade={true} speed={1} />
  );
};

export default StarsContainer;