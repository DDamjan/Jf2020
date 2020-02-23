import { SrednjeObrazovanje } from "./SrednjeObrazovanje";
import { VisokoObrazovanje } from "./VIsokoObrazovanje";

export interface Obrazovanje {
    srednjeObrazovanje: SrednjeObrazovanje;
    visokObrazovanje: VisokoObrazovanje;
}