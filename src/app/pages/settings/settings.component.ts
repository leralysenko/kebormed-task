import { Component, OnInit, inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { Language } from '../../model/language';
import { DateFormat } from '../../model/date-format';
import { Settings } from '../../model/settings';
import { SettingsService } from '../../services/settings.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ MatSelectModule, FormsModule, CommonModule, MatButtonModule ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  private readonly settingsService: SettingsService = inject(SettingsService);
  languages = Object.values(Language);
  dateFormats = Object.values(DateFormat);

  settings!: Settings;

  ngOnInit(): void {
    this.settings = this.settingsService.getSettings();
  }

  save(): void {
    this.settingsService.setSettings(this.settings);
  }
}
