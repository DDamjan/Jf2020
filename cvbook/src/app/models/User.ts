import { LicniPodaci } from './LicniPodaci';
import { Adresa } from './Adresa';
import { SrednjeObrazovanje } from './obrazovanje/SrednjeObrazovanje';
import { VisokoObrazovanje } from './obrazovanje/VIsokoObrazovanje';
import { Iskustvo } from './iskustvo/Iskustvo';

export interface User {
    userID?: number;
    email?: string;
    licniPodaci?: LicniPodaci;
    prebivaliste?: Adresa;
    boraviste?: Adresa;
    srednjeObrazovanje?: SrednjeObrazovanje[];
    visokoObrazovanje?: VisokoObrazovanje[];
    iskustvo?: Iskustvo[];
    ime?: string;
    prezime?: string;
    prosek?: number;
    fakultet?: string;
    cv?: string;
    visitedT?: string;
}
