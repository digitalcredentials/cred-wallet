import { ICertificate, IIssuer } from '../../utils/types';

export enum CertificateItemPresets {
  Carousel,
  Modal,
  Fullscreen,
}

export interface CertificateItemProps {
  certificate: ICertificate;
  issuer: IIssuer;
  onPress?: (certificate: ICertificate, issuer: IIssuer) => void;
  preset: CertificateItemPresets;
}
