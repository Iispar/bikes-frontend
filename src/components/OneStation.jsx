/* eslint-disable no-unused-vars */
import React from 'react';
import propTypes from 'prop-types';
import $ from 'jquery';
import {
  getCountTripsEnding, getCountTripsStarting, getTop, getAverageDistance,
} from './helpers/stationDataHelpers';

const Station = (props) => {
  const { id } = props;
  const { nameFi } = props;
  const { nameSwe } = props;
  const { adressFi } = props;
  const { adressSwe } = props;
  const { cityFi } = props;
  const { citySwe } = props;
  const { operator } = props;
  const { capasity } = props;
  const { x } = props;
  const { y } = props;

  /**
   * Clicking an station displays this.
   * We set and call all wanted data from backend and set it with jquery.
   * We also hide the list of stations first and then make visible
   * the single station view.
   */
  const setSingleStationThis = async () => {
    $('#stationInformation').attr('name', id);
    $('#list-container').css('display', 'none');
    $('#singleStation-container').css('display', 'flex');
    $('#singleStationHeader').text(nameFi);
    $('#singleStationInfo').text(`${adressFi},${cityFi}`);
    $('#singleStationCapasity').text(`capasity:${capasity}`);
    $('#singleStationTripsDeparture').text('all trips ending here: Waiting for data...');
    $('#singleStationTripsReturn').text('all trips ending here: Waiting for data...');
    $('#singleStationTripsDeparture').text('all trips ending here: Waiting for data...');
    $('#singleStationTripsReturn').text('all trips ending here: Waiting for data...');
    $('#singleStationTopReturning').text('top returning: Waiting for data...');
    $('#singleStationTopDeparting').text('top departing: Waiting for data...');
    $('#singleStationAvgReturning').text('avg distance returning: Waiting for data...');
    $('#singleStationAvgDeparting').text('avg distance departing: Waiting for data...');

    const tripsEndingHere = await getCountTripsEnding(id);
    $('#singleStationTripsDeparture').text(`all trips ending here: ${tripsEndingHere}`);
    const tripsStartingHere = await getCountTripsStarting(id);
    $('#singleStationTripsReturn').text(`all trips ending here: ${tripsStartingHere}`);

    const topReturning = await getTop('return', id, 'all');
    const topDeparting = await getTop('departure', id, 'all');
    $('#singleStationTopReturning').text(`top returning: ${topReturning}`);
    $('#singleStationTopDeparting').text(`top departing: ${topDeparting}`);

    const avgReturning = await getAverageDistance('return', id, 'all');
    const avgDeparting = await getAverageDistance('departure', id, 'all');
    $('#singleStationAvgReturning').text(`avg distance returning: ${avgReturning}`);
    $('#singleStationAvgDeparting').text(`avg distance departing: ${avgDeparting}`);
  };

  return (
    <div className="singleJourney-container" id={id} onClick={() => setSingleStationThis()} onKeyDown={() => setSingleStationThis()} role="button" tabIndex={0}>
      Name:
      {' '}
      {nameFi}
      , adress:
      {adressFi}
      , city:
      {cityFi}
      , operator:
      {operator}
      , capasity:
      {capasity}
    </div>
  );
};

Station.propTypes = {
  id: propTypes.string,
  nameFi: propTypes.string,
  nameSwe: propTypes.string,
  adressFi: propTypes.string,
  adressSwe: propTypes.string,
  cityFi: propTypes.string,
  citySwe: propTypes.string,
  operator: propTypes.string,
  capasity: propTypes.number,
  x: propTypes.string,
  y: propTypes.string,
};

Station.defaultProps = {
  id: null,
  nameFi: null,
  nameSwe: null,
  adressFi: null,
  adressSwe: null,
  cityFi: null,
  citySwe: null,
  operator: null,
  capasity: null,
  x: null,
  y: null,
};

export default Station;
