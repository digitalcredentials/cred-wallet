import moment from 'moment';

import { ICertificate } from '../../utils/types';

export const FIELDS = [
  {
    fieldName: 'Subject Name',
    getFieldValue: (certificate: ICertificate) =>
      certificate.credentialSubject.name,
  },
  {
    fieldName: 'Subject DID',
    getFieldValue: (certificate: ICertificate) =>
      certificate.credentialSubject.id,
  },
  {
    fieldName: 'Certificate ID',
    getFieldValue: (certificate: ICertificate) => certificate.id,
  },
  {
    fieldName: 'Issuance Date',
    getFieldValue: (certificate: ICertificate) =>
      moment(certificate.issuanceDate).format('DD/MM/YYYY'),
  }
];
