import { IMAGES } from '../../assets';
import { IWithID } from '../../utils/types';

enum Navigation {
  Backups = 'Backups',
  About = 'About',
}

export interface IMenuOption extends IWithID {
  title: string;
  iconSource: any;
  navigateTo: Navigation;
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
        navigateTo: Navigation.Backups,
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
        navigateTo: Navigation.About,
      },
    ],
  },
];
