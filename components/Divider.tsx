import React from "react";
import { View } from "./Themed";

const Divider = ({
  horizontal,
  vertical,
  color,
  spacing = 10,
}: {
  horizontal?: boolean;
  vertical?: boolean;
  color?: string;
  spacing?: number;
}) => {
  return (
    <View
      style={[
        vertical && { width: 1, marginHorizontal: spacing },
        horizontal && { height: 1, marginVertical: spacing },
        { backgroundColor: color ?? "transparent" },
      ]}
    />
  );
};

export default Divider;
