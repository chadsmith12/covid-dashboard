import { GlobalCovidInfo, CovidCountryInfo, CountryDataSeries } from "@/models/index";
import { CountryInfo } from './api-models';

export class NovelGlobalCovidInformation {
    totalCases: number;
    totalDeaths: number;
    totalRecovered: number;
    lastUpdated: Date;
    totalActive: number;

    constructor(globalInfo: GlobalCovidInfo) {
        this.totalCases = globalInfo.cases;
        this.totalDeaths = globalInfo.deaths;
        this.totalRecovered = globalInfo.recovered;
        this.lastUpdated = new Date(globalInfo.updated);
        this.totalActive = globalInfo.active;
    }
}

export class CountryCovidInformation {
    name: string;
    countryInfo: CountryInfo;
    totalCases: number;
    todayCases: number;
    totalDeaths: number;
    todayDeaths: number;
    totalRecovered: number;
    totalActive: number;
    totalCritical: number;
    casesPerOneMillion: number;
    deathsPerOneMillion: number;
    lastUpdated: Date;
    constructor(countryInfo: CovidCountryInfo) {
        this.name = countryInfo.country;
        this.countryInfo = countryInfo.countryInfo;
        this.totalCases = countryInfo.cases;
        this.todayCases = countryInfo.todayCases;
        this.totalDeaths = countryInfo.deaths;
        this.todayDeaths = countryInfo.todayDeaths;
        this.totalRecovered = countryInfo.recovered;
        this.totalActive = countryInfo.active;
        this.totalCritical = countryInfo.critical;
        this.casesPerOneMillion = countryInfo.casesPerOneMillion;
        this.deathsPerOneMillion = countryInfo.deathsPerOneMillion;
        this.lastUpdated = new Date(countryInfo.updated);
    }
}

export class NovelCountriesInformation {
    countries: CountryCovidInformation[];

    constructor(data: CovidCountryInfo[]) {
        this.countries = data.map(country => new CountryCovidInformation(country));
    }

    get totalCritical(): number {
        return this.countries.reduce((prev, current) => {
            return prev + current.totalCritical
        }, 0);
    }

    topCasesDistribution(numberCases: number): CountryDataSeries[] {
        const distributionData: CountryDataSeries[] = []
        for (let i = 0; i < numberCases; i++) {
            const item: CountryDataSeries = {
                country: this.countries[i].name,
                value: this.countries[i].totalCases
            };
            distributionData.push(item)
        }

        // get all the other countries data
        let sum = 0;
        for (let i = numberCases; i < this.countries.length; i++) {
            sum += this.countries[i].totalCases;
        }

        distributionData.push({
            country: 'Other',
            value: sum
        });

        return distributionData;
    }
}