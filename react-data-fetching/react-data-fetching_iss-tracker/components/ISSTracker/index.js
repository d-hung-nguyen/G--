import { useEffect, useState } from "react";
import useSWR from "swr";
import Controls from "../Controls/index";
import Map from "../Map/index";

const URL = "https://api.wheretheiss.at/v1/satellites/25544";
const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function ISSTracker() {
  const { data, error, mutate } = useSWR(URL, fetcher)
  //   const response = await fetch(url);
  //   if (!response.ok) {
  //     throw new Error("Fail to fetch ISS data");
  //   }
  //   const data = await response.json();
  //   return {longitude: data.longitude, latitude: data.latitude};
  // }, {
  //   refreshInterval: 5000 
  // });


const handleRefresh = () => {
  mutate();
};

if (error) return <div>Error beim ISS-Data-Fetch</div>;
if (!data) return <div>Es ladet</div>;


const { latitude, longitude } = data


  return (
    <main>
      <Map longitude={longitude} latitude={latitude} />
      <Controls
      longitude={longitude}
      latitude={latitude}
        onRefresh={handleRefresh}
      />
    </main>
  );
}
