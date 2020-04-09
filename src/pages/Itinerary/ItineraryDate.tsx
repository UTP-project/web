import React, { useState } from 'react';
import DateFnsUtils from '@material-ui/pickers/adapter/date-fns';
import {
  StaticDateRangePicker,
  DateRange,
  LocalizationProvider,
} from '@material-ui/pickers';
import { zhCN } from 'date-fns/locale';

const ItineraryDate: React.FC = () => {
  const [selectedDate, handleDateChange] = useState<DateRange>([null, null]);

  return (
    <LocalizationProvider dateAdapter={DateFnsUtils} locale={zhCN}>
      <StaticDateRangePicker
        displayStaticWrapperAs="mobile"
        disablePast
        startText="起始"
        endText="结束"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </LocalizationProvider>
  );
};

export default ItineraryDate;
