import { Share } from 'react-native';
import FS from 'react-native-fs';

export class FileManager {
  static async createFile(filename: string, message: string): Promise<string> {
    const filepath = `${FS.LibraryDirectoryPath}/${filename}`;

    return FS.writeFile(filepath, message, 'utf8').then(() => filepath);
  }

  static async shareFile(url: string, filename: string) {
    const message: string = `Save ${filename} to:`;
    return await Share.share({
      url,
      title: message,
      message,
    });
  }
}
