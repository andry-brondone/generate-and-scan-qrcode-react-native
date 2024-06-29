import { useRef } from "react";
import { Animated, ScrollView } from "react-native";
import { HeaderLogo } from "../header/HeaderLogo";

interface Props {
  children: React.ReactNode;
}

export function AnimatedHeaderSroll({ children }: Props) {
  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  return (
    <>
      <HeaderLogo value={scrollOffsetY} />
      <ScrollView
        scrollEventThrottle={5}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          {
            useNativeDriver: false,
          }
        )}
      >
        {children}
      </ScrollView>
    </>
  );
}
