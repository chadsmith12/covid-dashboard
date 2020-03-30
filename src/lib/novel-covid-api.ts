import { makeApiUrl } from "@/helpers/url-builder";
import { NovelGlobalCovidInformation, GlobalCovidInfo, NovelCountriesInformation, CovidCountryInfo, GetCovidCountryDataOptions, CountryCovidInformation, CovidStateInfo } from "@/models";
const NOVEL_BASE_URL = 'https://corona.lmao.ninja';

export function getAllCovidInfo(): Promise<NovelGlobalCovidInformation> {
    const url = makeApiUrl(NOVEL_BASE_URL, 'all');

    return fetch(url)
        .then(response => response.json())
        .then((response: GlobalCovidInfo) => {
            return new NovelGlobalCovidInformation(response);
        });
}

export function getAllCovidCountryData(options: GetCovidCountryDataOptions): Promise<NovelCountriesInformation> {
    const url = makeApiUrl(NOVEL_BASE_URL, 'countries', options);

    return fetch(url)
        .then(response => response.json())
        .then((response: CovidCountryInfo[]) => {
            return new NovelCountriesInformation(response);
        })
}

export function getCountryCovidData(country: string): Promise<CountryCovidInformation> {
    const url = makeApiUrl(NOVEL_BASE_URL, `countries/${country}`);

    return fetch(url)
        .then(response => response.json())
        .then((response: CovidCountryInfo) => {
            return new CountryCovidInformation(response);
        })
}

export function getStatesCovidData(): Promise<CovidStateInfo[]> {
    const url = makeApiUrl(NOVEL_BASE_URL, 'states');

    return fetch(url)
        .then(response => response.json());
}