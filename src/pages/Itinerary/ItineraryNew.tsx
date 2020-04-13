import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { FullLngLatPos } from 'react-amap';
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
  const [routes, setRoutes] = useState<FullLngLatPos[][] | undefined>([]);

  const handleGenerate = async (): Promise<void> => {
    // fetch route info
    const paramList = [];
    for (let i = 0; i < selectedViewpoints.length; i += 1) {
      for (let j = i + 1; j < selectedViewpoints.length; j += 1) {
        const origins = selectedViewpoints[i].location;
        const destination = selectedViewpoints[j].location;
        paramList.push({ origins, destination });
      }
    }
    const resList = await promiseWait(paramList, fetchDistance, 10, 200);

    const distList = resList.map(res => +res.results[0].distance);
    const durList = resList.map(res => +res.results[0].duration);
    const distMatrix = list2symMatrix(selectedViewpoints.length, distList);
    const durMatrix = list2symMatrix(selectedViewpoints.length, durList);

    // get route
    const res = await fetchRoute({
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
          subRoute.map(pointIdx => {
            const pos = selectedViewpoints[pointIdx - 1].location.split(',');
            return { longitude: +pos[0], latitude: +pos[1] };
          })
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
        <ItineraryRes routes={routes} />
      </Route>
    </Switch>
  );
};

export default ItineraryNew;
