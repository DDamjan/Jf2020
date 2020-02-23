import { Kontakt } from "./Kontakt";

export interface LicniPodaci{
    ime: string;
    prezime: string;
    imeRoditelja: string;
    datumRodjenja: Date;
    kontakt: Kontakt
    profilnaSlika: string; //Naziv fajla
    cv: string;            //Naziv fajla
}   