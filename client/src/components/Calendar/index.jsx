import React from 'react';
import PropTypes from 'prop-types';

import {
  Hours,
  Cell,
  Container,
  HoursColumn,
  Column,
  Event,
} from './styles';

function getNumbers(from, to) {
  const arr = [];
  for (let i = from; i <= to; i += 1) {
    arr.push(i);
  }
  return arr;
}

function getEventsToHours(events) {
  const map = {};
  events.forEach((item) => {
    map[item.timeFrom.hours] = map[item.timeFrom.hours] || [];
    map[item.timeFrom.hours].push(item);
  });
  return map;
}

function getEventHeight(event, hourHeight) {
  const minutesInHour = 60;
  const from = event.timeFrom;
  const to = event.timeTo;
  const fromInHours = from.hours + (from.minutes / minutesInHour);
  const toInHours = to.hours + (to.minutes / minutesInHour);
  return (toInHours - fromInHours) * hourHeight;
}

function getEventTop(event, hourHeight) {
  const minutesInHour = 60;
  const from = event.timeFrom;
  const minutesInHours = from.minutes / minutesInHour;
  return minutesInHours * hourHeight;
}

function renderEvents(events) {
  return events.map(event => (
    <Event
      height={getEventHeight(event, 100)}
      top={getEventTop(event, 100)}
      key={event.id}
    >
      {event.name}
    </Event>
  ));
}

function Calendar(props) {
  const {
    events,
  } = props;
  const eventsToHours = getEventsToHours(events);

  const numbersForTime = getNumbers(1, 23);
  const hours = numbersForTime.map(item => (
    <Hours key={item}>
      {item.toString().padStart(2, '0')}:00
    </Hours>
  ));
  const numbersForEvents = getNumbers(0, 23);
  const cells = numbersForEvents.map(item => (
    <Cell key={item}>
      {eventsToHours[item] && renderEvents(eventsToHours[item])}
    </Cell>
  ));

  return (
    <Container>
      <HoursColumn primary>
        {hours}
      </HoursColumn>
      <Column>
        {cells}
      </Column>
    </Container>
  );
}

const timeShape = {
  hours: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
};

Calendar.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    timeFrom: PropTypes.shape(timeShape).isRequired,
    timeTo: PropTypes.shape(timeShape).isRequired,
  })),
};

Calendar.defaultProps = {
  events: [],
};

export default Calendar;
