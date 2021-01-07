import { Share, ShareAction } from 'react-native';
import FS from 'react-native-fs';
import { isAndroid } from '../../utils';

export class FileManager {
  static async createFile(filename: string, message: string): Promise<string> {
    const dirPath = isAndroid
      ? FS.DocumentDirectoryPath
      : FS.LibraryDirectoryPath;

    const filepath = `${dirPath}/${filename}`;

    return FS.writeFile(filepath, message, 'utf8').then(() => filepath);
  }

  static async shareFile(url: string, filename: string): Promise<ShareAction> {
    return Share.share({
      url: `file://${url}`,
      title: filename,
    });
  }
}
