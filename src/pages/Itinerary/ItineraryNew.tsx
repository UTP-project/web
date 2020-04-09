import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ItineraryDate from './ItineraryDate';
import ItineraryInfo from './ItineraryInfo';
import ItineraryCity from './ItineraryCity';
import ItineraryViewpoint from './ItineraryViewpoint';

const ItineraryNew: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/itinerary/new">
        <Redirect to="/itinerary/new/date" />
      </Route>
      <Route exact path="/itinerary/new/date" component={ItineraryDate} />
      <Route exact path="/itinerary/new/info" component={ItineraryInfo} />
      <Route exact path="/itinerary/new/city" component={ItineraryCity} />
      <Route
        exact
        path="/itinerary/new/viewpoint"
        component={ItineraryViewpoint}
      />
    </Switch>
  );
};

export default ItineraryNew;
