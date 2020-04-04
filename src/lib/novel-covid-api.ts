import { makeApiUrl } from "@/helpers/url-builder";
import { NovelGlobalCovidInformation, GlobalCovidInfo, NovelCountriesInformation, CovidCountryInfo, GetCovidCountryDataOptions, CountryCovidInformation, CovidStateInfo, HistoricalTimeLine, CountryTimeItem } from "@/models";
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

export function getCountryTimeSeries(countryName: string) {
    const url = makeApiUrl(NOVEL_BASE_URL, 'v2/historical');

    return fetch(url)
        .then(response => response.json())
        .then((data: HistoricalTimeLine[]) => {
            const countryData = data.filter((timeline) => timeline.country === countryName)[0];
            const dateStrings = Object.keys(countryData.timeline.cases);
            const casesTimeSeries: CountryTimeItem[] = []
            for (const dateString of dateStrings) {
                const date = new Date(dateString);
                const dateCases = countryData.timeline.cases[dateString];
                casesTimeSeries.push({ date, value: dateCases })
            }

            return casesTimeSeries;
        })
}