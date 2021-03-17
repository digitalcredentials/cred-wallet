import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import { MergedStackParams } from '../../navigation/stacks';

type NavigationProps = StackNavigationProp<
  MergedStackParams,
  'CertificateSearchView'
>;
type RouteProps = StackScreenProps<MergedStackParams, 'CertificateSearchView'>;

export interface CertificateSearchViewScreenProps
  extends NavigationProps,
    RouteProps {}
