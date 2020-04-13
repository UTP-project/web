import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  createStyles,
  AppBar,
  Toolbar,
  Typography,
  Box,
} from '@material-ui/core';
import { Map, Polyline, FullLngLatPos } from 'react-amap';
import { AMAP_KEY_WEB, colorRoulette } from '../../common/const';

import '../index.css';

export interface ItineraryResProps {
  routes: FullLngLatPos[][] | undefined;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    appbar: {
      background: 'rgb(127, 95, 251)',
    },
    mid: {
      flexGrow: 1,
    },
    map: {
      width: '100%',
      height: '100%',
      zIndex: 0,
    },
    view: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
      flexGrow: 1,
      padding: 8,
      overflowY: 'scroll',
      background: '#eee',
    },
  })
);

const ItineraryRes: React.FC<ItineraryResProps> = ({ routes }) => {
  const classes = useStyles();

  const [center, setCenter] = useState<FullLngLatPos | undefined>();
  const [zoom] = useState(11);

  useEffect(() => {
    if (routes) {
      // calculate center point
      let lngMax = -180;
      let lngMin = 180;
      let latMax = -90;
      let latMin = 90;
      for (let i = 0; i < routes.length; i += 1) {
        for (let j = 0; j < routes[i].length; j += 1) {
          lngMax =
            routes[i][j].longitude > lngMax ? routes[i][j].longitude : lngMax;
          lngMin =
            routes[i][j].longitude < lngMin ? routes[i][j].longitude : lngMin;
          latMax =
            routes[i][j].latitude > latMax ? routes[i][j].latitude : latMax;
          latMin =
            routes[i][j].latitude < latMin ? routes[i][j].latitude : latMin;
        }
      }
      const newCenter = {
        longitude: (lngMax + lngMin) / 2,
        latitude: (latMax + latMin) / 2,
      };
      setCenter(newCenter);
      // add center into routes
      for (let i = 0; i < routes.length; i += 1) {
        routes[i].unshift(newCenter);
        routes[i].push(newCenter);
      }
    }
  }, [routes]);

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} position="sticky">
        <Toolbar>
          <Typography variant="h6" className={classes.mid}>
            路线结果
          </Typography>
        </Toolbar>
      </AppBar>
      <Box className={classes.map}>
        <Map
          amapkey={AMAP_KEY_WEB}
          mapStyle="fresh"
          center={center}
          zoom={zoom}
        >
          {routes &&
            routes
              .map((subRoute, idx) => ({
                id: `opt-route-${idx}`,
                color: colorRoulette[idx % colorRoulette.length],
                locations: [...subRoute],
              }))
              .map(subRoute => (
                <Polyline
                  key={subRoute.id}
                  path={subRoute.locations}
                  style={{ strokeColor: subRoute.color }}
                />
              ))}
        </Map>
      </Box>
      <div className={classes.view} />
    </div>
  );
};

export default ItineraryRes;
