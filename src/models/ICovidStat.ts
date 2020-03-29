/**
 * Represents a stat for the country for that time series.
 */
export default interface CovidState {
    /**
     * The date of the stat recorded
     */
    date: string;
    /**
     * Number confirmed total to that day
     */
    confirmed: number;
    /**
     * Number of deaths total to that day
     */
    deaths: number;
    /**
     * Number of  recovered total to that day
     */
    recovered: number;
}