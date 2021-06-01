import { IMAGES } from '../../assets';
import { IWithID } from '../../utils/types';

export interface IMenuOption extends IWithID {
  title: string;
  iconSource: any;
  navigateTo: 'Backups';
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
        navigateTo: 'Backups',
      },
    ],
  },
  {
    title: 'Application settings',
    data: [
      {
        id: 'backups',
        title: 'About',
        iconSource: IMAGES.MORE,
        navigateTo: 'Backups',
      },
    ],
  },
];
