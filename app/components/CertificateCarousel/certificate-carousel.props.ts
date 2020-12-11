import { ICertificate, IIssuer } from '../../utils/types';

export interface CertificateCarouselProps {
  certificates: ICertificate[];
  issuer: IIssuer;
}
