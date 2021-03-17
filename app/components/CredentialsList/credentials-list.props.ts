import { ICredentials } from '../../utils/types';

export interface CredentialsListProps {
  onCredentialsPress: (credentials: ICredentials) => void;
}
