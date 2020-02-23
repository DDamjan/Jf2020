import { RadnoIskustvo } from "./RadnoIskustvo";
import { RadNaRacunaru } from "./RadNaRacunaru";
import { OstaleVestine } from "./OstaleVestine";
import { RadNaProjektu } from "./RadNaProjektu";
import { StrucnoUsavrsavanje } from "./StrucnoUsavrsavanje";
import { PoznavanjeJezika } from "./PoznavanjeJezika";

export interface Iskustvo{
    radnoIskustvo: RadnoIskustvo[];
    strucnoUsavrsavanje: StrucnoUsavrsavanje[];
    radNaRacunaru: RadNaRacunaru[];
    radNaProjektu: RadNaProjektu[];
    poznavanjeJezika: PoznavanjeJezika[];
    ostaleVestine: OstaleVestine;
}   