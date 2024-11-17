import { Injectable } from '@angular/core';
import { Language } from '../model/language';
import { DateFormat } from '../model/date-format';
import { Settings } from '../model/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private storageKey = 'appSettings';

  getSettings(): Settings {
    const settings = localStorage.getItem(this.storageKey);
    return settings ? JSON.parse(settings) : { language: Language.english,
      dateFormat: DateFormat.dateMonth };
  }

  setSettings(settings: { language: Language, dateFormat: DateFormat }): void {
    localStorage.setItem(this.storageKey, JSON.stringify(settings));
  }
}
