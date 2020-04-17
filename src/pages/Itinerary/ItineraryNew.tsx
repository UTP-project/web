import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ArrayLngLat } from 'react-amap';
import ItineraryDate from './ItineraryDate';
import ItineraryInfo from './ItineraryInfo';
import ItineraryCity from './ItineraryCity';
import ItineraryViewpoint from './ItineraryViewpoint';
import ItineraryRes from './ItineraryRes';
import { District } from '../../services/FetchCity';
import { Poi } from '../../services/FetchViewpoint';
import { fetchDistance } from '../../services/FetchDistance';
import { fetchRoute } from '../../services/FetchRoute';
import { promiseWait, list2symMatrix } from '../../common/utils';

const ItineraryNew: React.FC = () => {
  const [start] = useState(new Date());
  const [end] = useState(new Date());
  const [peopleNum, setPeopleNum] = useState('0');
  const [crowdType, setCrowdType] = useState('0');
  const [travelMode, setTravelMode] = useState('0');
  const [dayTime, setDayTime] = useState('0');
  const [selectedCities, setSelectedCities] = useState<District[]>([]);
  const [selectedViewpoints, setSelectedViewpoints] = useState<Poi[]>([]);
  const [center, setCenter] = useState<ArrayLngLat>();
  const [routes, setRoutes] = useState<ArrayLngLat[][] | undefined>([]);

  const handleGenerate = async (): Promise<void> => {
    // get locations of viewpoints
    const locations = selectedViewpoints.map(point => {
      const [lng, lat] = point.location.split(',');
      return [+lng, +lat];
    }) as ArrayLngLat[];
    // calculate center point
    let lngSum = 0;
    let latSum = 0;
    locations.forEach(locArr => {
      lngSum += locArr[0];
      latSum += locArr[1];
    });
    const centerPoint = [
      Math.round((lngSum / locations.length) * 1000 * 1000) / (1000 * 1000),
      Math.round((latSum / locations.length) * 1000 * 1000) / (1000 * 1000),
    ] as ArrayLngLat;
    locations.unshift(centerPoint);
    setCenter(centerPoint);
    // init params list of fetchDistance
    const paramList = [];
    for (let i = 0; i < locations.length - 1; i += 1) {
      const destination = `${locations[i][0]},${locations[i][1]}`;
      let origins = '';
      for (let j = i + 1; j < locations.length; j += 1) {
        origins += `${locations[j][0]},${locations[j][1]}|`;
      }
      paramList.push({ origins, destination });
    }
    // limit promise number & get distance, duration
    const resList = await promiseWait(paramList, fetchDistance, 10, 300);
    const flatRes = resList.reduce((acc, cur) => [...acc, ...cur.results], []);

    // change list to sysmmetric
    const distList = flatRes.map(res => +res.distance);
    const durList = flatRes.map(res => +res.duration);
    const distMatrix = list2symMatrix(locations.length, distList);
    const durMatrix = list2symMatrix(locations.length, durList);

    // get route
    const res = await fetchRoute({
      // locations, // experimental data need
      // eslint-disable-next-line @typescript-eslint/camelcase
      dist_matrix: distMatrix,
      // eslint-disable-next-line @typescript-eslint/camelcase
      dur_matrix: durMatrix,
      // eslint-disable-next-line @typescript-eslint/camelcase
      day_limit_time: +dayTime + 3,
    });
    if (res.status) {
      if (res.routes) {
        const optRoutes = res.routes.map(subRoute =>
          subRoute.map(pointIdx => locations[pointIdx])
        );
        setRoutes(optRoutes);
      }
    }
  };

  return (
    <Switch>
      <Route exact path="/itinerary/new">
        <Redirect to="/itinerary/new/date" />
      </Route>
      <Route exact path="/itinerary/new/date">
        <ItineraryDate start={start} end={end} />
      </Route>
      <Route exact path="/itinerary/new/info">
        <ItineraryInfo
          peopleNum={peopleNum}
          crowdType={crowdType}
          travelMode={travelMode}
          dayTime={dayTime}
          setPeopleNum={setPeopleNum}
          setCrowdType={setCrowdType}
          setTravelMode={setTravelMode}
          setDayTime={setDayTime}
        />
      </Route>
      <Route exact path="/itinerary/new/city">
        <ItineraryCity
          selectedCities={selectedCities}
          setSelectedCities={setSelectedCities}
        />
      </Route>
      <Route exact path="/itinerary/new/viewpoint">
        <ItineraryViewpoint
          selectedCities={selectedCities}
          selectedViewpoints={selectedViewpoints}
          setSelectedViewpoints={setSelectedViewpoints}
          handleGenerate={handleGenerate}
        />
      </Route>
      <Route exact path="/itinerary/new/result">
        <ItineraryRes center={center} routes={routes} />
      </Route>
    </Switch>
  );
};

export default ItineraryNew;
