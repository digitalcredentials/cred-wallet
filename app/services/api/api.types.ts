export interface User {
  id: string;
  firstName: string;
  lastName: string;
  image?: string;
}

export interface Credential {
  '@context': string[];
  type: string[];
  issuer: {
    type: 'issuer';
    id: string;
    image: string;
    name: string;
    url: string;
  };
  credentialSubject: {
    type: string;
    name: string;
    hasAchieved: {
      type: string[];
      id: string;
      name: string;
      description: string;
    };
    id: string;
  };
  id: string;
  issuanceDate: string;
  proof: Record<string, string | Object>;
}
