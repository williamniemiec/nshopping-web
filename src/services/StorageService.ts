import { STORAGE_KEYS } from "../config/storageKeys";
import { LocalUserDTO } from "../dto/LocalUserDTO";

export class StorageService {

  getLocalUser(): LocalUserDTO {
    let user = localStorage.getItem(STORAGE_KEYS.localUser);

    if (user == null) {
      return null;
    }

    return JSON.parse(user);
  }

  setLocalUser(user: LocalUserDTO) {
    if (user == null)
      localStorage.removeItem(STORAGE_KEYS.localUser);
    else
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(user));
  }
}
