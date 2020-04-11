import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ItineraryDate from './ItineraryDate';
import ItineraryInfo from './ItineraryInfo';
import ItineraryCity from './ItineraryCity';
import ItineraryViewpoint from './ItineraryViewpoint';
import { District } from '../../services/FetchCity';
import { Poi } from '../../services/FetchViewpoint';

const ItineraryNew: React.FC = () => {
  const [start] = useState(new Date());
  const [end] = useState(new Date());
  const [peopleNum, setPeopleNum] = useState('0');
  const [crowdType, setCrowdType] = useState('0');
  const [travelMode, setTravelMode] = useState('0');
  const [dayTime, setDayTime] = useState('0');
  const [selectedCities, setSelectedCities] = useState<District[]>([]);
  const [selectedViewpoints, setSelectedViewpoints] = useState<Poi[]>([]);

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
        />
      </Route>
    </Switch>
  );
};

export default ItineraryNew;
