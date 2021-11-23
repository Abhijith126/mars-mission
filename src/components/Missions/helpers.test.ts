import { daysDiff, monthDiff, getDepartureDays } from './helpers';
import moment from 'moment';

const getDateByDays = (days: number) => moment(new Date()).add(days, 'days').format('YYYY-MM-DD');

describe('Test Mission date helpers', () => {
  test('Differnce between current and given date', () => {
    expect(daysDiff(getDateByDays(2))).toBe(2);
    expect(daysDiff(getDateByDays(-5))).toBe(-5);
    expect(daysDiff(getDateByDays(10))).toBe(10);
  });


  test('Differnce between current and given month', () => {
    expect(monthDiff(getDateByDays(70))).toBe(2);
    expect(monthDiff(getDateByDays(-200))).toBe(-6);
    expect(monthDiff(getDateByDays(1))).toBe(0);
  });


  test('Difference of days', () => {
    expect(getDepartureDays(getDateByDays(70))).toEqual('in 70 days');
    expect(getDepartureDays(getDateByDays(-200))).toEqual('Departed');
    expect(getDepartureDays(getDateByDays(1))).toEqual('in 1 days');
  });
});
