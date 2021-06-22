import { ImageStyle } from 'react-native';

import { IMAGES } from '../../assets';
import { IWithID } from '../../utils/types';
import { styles } from './settings.styles';

enum MenuOptionRedirect {
  Backups = 'Backups',
  About = 'About',
}

export interface IMenuOption extends IWithID {
  title: string;
  iconSource: any;
  iconStyle: ImageStyle;
  navigateTo: MenuOptionRedirect;
}

interface ISectionData {
  title: string;
  data: IMenuOption[];
}

export const MENU_ITEMS: ISectionData[] = [
  {
    title: 'General settings',
    data: [
      {
        id: 'backups',
        title: 'My Backups',
        iconSource: IMAGES.BACKUP,
        iconStyle: styles.itemImage,
        navigateTo: MenuOptionRedirect.Backups,
      },
    ],
  },
  {
    title: 'Application settings',
    data: [
      {
        id: 'about',
        title: 'About',
        iconSource: IMAGES.ABOUT,
        iconStyle: styles.aboutImage,
        navigateTo: MenuOptionRedirect.About,
      },
    ],
  },
];
