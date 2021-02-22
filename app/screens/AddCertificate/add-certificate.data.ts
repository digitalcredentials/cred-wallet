import moment from 'moment';

import { ICertificate } from '../../utils/types';

export const FIELDS = [
  {
    fieldName: 'DID',
    getFieldValue: (certificate: ICertificate) =>
      certificate.credentialSubject.id,
  },
  {
    fieldName: 'ID',
    getFieldValue: (certificate: ICertificate) => certificate.id,
  },
  {
    fieldName: 'Date',
    getFieldValue: (certificate: ICertificate) =>
      moment(certificate.issuanceDate).format('DD/MM/YYYY'),
  },
];
