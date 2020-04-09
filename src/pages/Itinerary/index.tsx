import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ItineraryList from './ItineraryList';
import ItineraryNew from './ItineraryNew';

const Itinerary: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/itinerary">
        <Redirect to="/itinerary/list" />
      </Route>
      <Route exact path="/itinerary/list" component={ItineraryList} />
      <Route path="/itinerary/new" component={ItineraryNew} />
    </Switch>
  );
};

export default Itinerary;
