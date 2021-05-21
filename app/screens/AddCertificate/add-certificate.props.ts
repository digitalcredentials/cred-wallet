import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';

import { MergedStackParams } from '../../navigation/stacks';

type NavigationProps = StackNavigationProp<MergedStackParams, 'AddCertificate'>;
type RouteProps = StackScreenProps<MergedStackParams, 'AddCertificate'>;

export interface IAddCertificateScreenProps
  extends NavigationProps,
    RouteProps {}
