import * as moment from 'moment';
import { AppConstants } from '../common';

export const convertDateFormat = (dateString: string): string => {
  return moment(dateString, AppConstants.DATE_FORMAT).format(
    AppConstants.DATE_TO_STRING_FORMAT,
  );
};

export const getDateStringWithoutTimezone = (date: Date) => {
  if (!date) {
    return '';
  }

  // const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  // const dateLessOffset = new Date(date.getTime() - userTimezoneOffset);
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

export const getMiamiCurrentDate = (): Date => {
  return new Date(
    new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
    }),
  );
};
