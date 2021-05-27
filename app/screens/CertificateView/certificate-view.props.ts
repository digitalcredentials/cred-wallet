import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';

import { MergedStackParams } from '../../navigation/stacks';

type NavigationProps = StackNavigationProp<
  MergedStackParams,
  'CertificateView'
>;
type RouteProps = StackScreenProps<MergedStackParams, 'CertificateView'>;

export interface ICertificateViewScreenProps
  extends NavigationProps,
    RouteProps {}
