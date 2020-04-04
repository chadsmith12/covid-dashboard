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

/**
 * Represents a single point in a timeline for a country
 */
export interface CountryTimeItem {
    date: Date;
    value: number;
}