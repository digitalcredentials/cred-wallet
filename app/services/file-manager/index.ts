import { Share, ShareAction } from 'react-native';
import FS from 'react-native-fs';

export class FileManager {
  static async createFile(filename: string, message: string): Promise<string> {
    const filepath = `${FS.LibraryDirectoryPath}/${filename}`;

    return FS.writeFile(filepath, message, 'utf8').then(() => filepath);
  }

  static async shareFile(url: string, filename: string): Promise<ShareAction> {
    return Share.share({
      url: `file://${url}`,
      title: filename,
    });
  }

  static async readFile(filepath: string): Promise<string> {
    return FS.readFile(filepath);
  }
}
