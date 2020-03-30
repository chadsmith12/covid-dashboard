/**
 * Represents the global covid information response received from the /all endpoint
 */
export interface GlobalCovidInfo {
    /**
     * The total number of cases
     */
    cases: number;
    /**
     * The total number of deaths
     */
    deaths: number;
    /**
     * The total number of recovered
     */
    recovered: number;
    /**
     * the number of milliseconds last updated in ISO Date
     */
    updated: number;
    /**
     * The total number of active cases
     */
    active: number;
}

/**
 * Represents a countries Covid information. 
 * One object inside the /countries endpoint
 */
export interface CovidCountryInfo {
    /**
     * The name of the country
     */
    country: string;
    /**
     * General information about the country
     */
    countryInfo: CountryInfo;
    /**
     * The total number of cases for this country
     */
    cases: number;
    /**
     * The number of cases reported today for this country
     */
    todayCases: number;
    /**
     * The total number of deaths for this country
     */
    deaths: number;
    /**
     * The number of deaths reported today for this country
     */
    todayDeaths: number;
    /**
     * The total number of recovered for this country
     */
    recovered: number;
    /**
     * The total number of active cases for this country
     */
    active: number;
    /**
     * the total number of critical cases for this country
     */
    critical: number;
    /**
     * The total number of cases per one million population for this country
     */
    casesPerOneMillion: number;
    /**
     * The total number of deaths per one million population for this country
     */
    deathsPerOneMillion: number;
    /**
     * the number of milliseconds last updated in ISO Date
     */
    updated: number;
}

/**
 * The parameter you want to sort the result by.
 */
export type CovidCountryInfoSortBy = keyof CovidCountryInfo;

/**
 * The options to pass into the api to get all the covid countries data.
 */
export interface GetCovidCountryDataOptions {
    sort: CovidCountryInfoSortBy;
}

/**
 * Represents general country information
 */
export interface CountryInfo {
    _id: number;
    /**
     * The name of the country
     */
    country: string;
    /**
     * The countries iso2 code
     */
    iso2: string;
    /**
     * The countries iso3 code
     */
    iso3: string;
    /**
     * the countries lattitude
     */
    lat: number;
    /**
     * The countries longitude
     */
    long: number;
    /**
     * Link the countries flag asset
     */
    flag: string;
}

/**
 * Presents a states Covid information
 * One object inside the /states endpoint
 */
export interface CovidStateInfo {
    /**
     * The name of the state
     */
    state: string;
    /**
     * The total number of cases for this state
     */
    cases: number;
    /**
     * The number of cases today for this state
     */
    todayCases: number;
    /**
     * The total number of deaths for this state
     */
    deaths: number;
    /**
     * The number of deaths today for this sate
     */
    todayDeaths: number;
    /**
     * The total number of current active cases for this sate.
     */
    active: number;
}