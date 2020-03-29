import CovidState from '@/models/ICovidStat';

const TIMESERIES_API_URL = 'https://pomber.github.io/covid19/timeseries.json';

/**
 * Represents the tme series of Covid for each country
 * Key will be the country and array of the time series dates starting from 1-22-2020
 */
export type CovidTimeSeries = Record<string, CovidState[]>;

/***
 * Calls the time series API to get the Covid Time Series data.
 */
export function getAllTimeSeries(): Promise<CovidTimeSeries> {
    return fetch(TIMESERIES_API_URL)
    .then(response => response.json());
}

/**
 * Gets all the countries that are in the Covid Time Series data
 * @param data The Covid time series data to get the countries from
 */
export function getCountries(data: CovidTimeSeries): string[] {
    return Object.keys(data);
}

/**
 * Gets al the confirmed from the time series for a country.
 * @param data the Covid Time Series Data to get the confirmed from
 * @param country The country to get the confirmed for
 */
export function getConfirmedByCountry(data: CovidTimeSeries, country: string): number[] {
    const countryData = data[country];
    if(countryData === undefined) {
        return [];
    }

    return data[country].map(timeData  => timeData.confirmed);
}

/**
 * Gets all the total confirmed from all the countries.
 * @param data The Covid time series  data to get the confirmed from
 */
export function getTotalConfirmed(data: CovidTimeSeries): number[] {
    const values = Object.values(data);
    const flatenedValues = values.flatMap(values => values);

    return flatenedValues.map(timeData => timeData.confirmed);
}

/**
 * Get the dates from the time series for a country.
 * @param data The Covid Time Series data to get the dates from
 * @param country The country to get the dates for
 */
export function getDatesByCountry(data: CovidTimeSeries, country: string): string[] {
    const countryData = data[country];
    if(countryData === undefined) {
        return [];
    }

    return countryData.map(timeData => timeData.date);
}