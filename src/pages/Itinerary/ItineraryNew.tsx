import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ItineraryDate from './ItineraryDate';
import ItineraryInfo from './ItineraryInfo';
import ItineraryCity from './ItineraryCity';
import ItineraryViewpoint from './ItineraryViewpoint';
import { District } from '../../services/FetchCity';
import { Poi } from '../../services/FetchViewpoint';
import { fetchDistance } from '../../services/FetchDistance';
import { list2symMatrix } from '../../common/utils';

const ItineraryNew: React.FC = () => {
  const [start] = useState(new Date());
  const [end] = useState(new Date());
  const [peopleNum, setPeopleNum] = useState('0');
  const [crowdType, setCrowdType] = useState('0');
  const [travelMode, setTravelMode] = useState('0');
  const [dayTime, setDayTime] = useState('0');
  const [selectedCities, setSelectedCities] = useState<District[]>([]);
  const [selectedViewpoints, setSelectedViewpoints] = useState<Poi[]>([]);

  const handleGenerate = async (): Promise<void> => {
    // fetch route info
    const reqList = [];
    for (let i = 0; i < selectedViewpoints.length; i += 1) {
      for (let j = i + 1; j < selectedViewpoints.length; j += 1) {
        const origins = selectedViewpoints[i].location;
        const destination = selectedViewpoints[j].location;
        reqList.push(fetchDistance({ origins, destination }));
      }
    }
    const resList = await Promise.all(reqList);

    const distList = resList.map(res => +res.results[0].distance);
    const durList = resList.map(res => +res.results[0].duration);
    const distMatrix = list2symMatrix(selectedViewpoints.length, distList);
    const durMatrix = list2symMatrix(selectedViewpoints.length, durList);

    console.log(distMatrix);
    console.log(durMatrix);
    // get route
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
    </Switch>
  );
};

export default ItineraryNew;
