import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';

const BMap = window.BMap || {};

const YMap: React.FC = () => {
  useEffect(() => {
    const map = new BMap.Map('map-container', {
      enableMapClick: false,
    });

    const point = new BMap.Point(116.404, 39.915);
    map.addEventListener('click', (e: any) => {
      console.log(e.point.lng, e.point.lat);
    });
    map.centerAndZoom(point, 15);
  }, []);

  return (
    <Box position="absolute" width="100%" height="100%" id="map-container" />
  );
};

export default YMap;
