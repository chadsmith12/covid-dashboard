/**
 * Represents a data series object to be used inside a chart to show distrubtion of some series of data
 */
export interface CountryDataSeries {
    /**
     * The country this is for
     */
    country: string;
    /**
     * the value we are representing for this country
     */
    value: number;
}