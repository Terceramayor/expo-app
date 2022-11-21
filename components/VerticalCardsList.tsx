import React from "react";
import { Hotel } from "../types";
import Divider from "./Divider";
import LandscapeCard from "./LandscapeCard";

export default function VerticalCardsList({
  data,
  onPress,
}: {
  data: Hotel[];
  onPress?: (hotel: Hotel) => void;
}) {
  return (
    <>
      {data.map((hotel: Hotel, index: number) => (
        <React.Fragment key={hotel.id}>
          <LandscapeCard {...hotel} onPress={onPress} />
          {index < data.length && <Divider horizontal />}
        </React.Fragment>
      ))}
    </>
  );
}
