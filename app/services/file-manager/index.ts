import { Share } from 'react-native';
import FS from 'react-native-fs';

export class FileManager {
  static async createFile(
    filename: string,
    message: string,
  ): Promise<string | null> {
    const filepath = `${FS.LibraryDirectoryPath}/${filename}`;

    return FS.writeFile(filepath, message, 'utf8')
      .then(() => filepath)
      .catch(() => null);
  }

  static shareFile(url: string, filename: string) {
    const message: string = `Save ${filename} to:`;
    return Share.share({
      url,
      title: message,
      message,
    });
  }
}
