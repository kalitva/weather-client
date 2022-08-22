import { Component, EventEmitter, Output } from '@angular/core';
import { CitySearchService } from 'src/app/services/city-search.service';

@Component({
  selector: 'app-city-autocomplete',
  templateUrl: './city-autocomplete.component.html',
  styleUrls: ['./city-autocomplete.component.css']
})
export class CityAutocompleteComponent {
  @Output() onSelect: EventEmitter<string>;

  suggestions: string[];
  selectedIndex: number;

  constructor(private citySearchService: CitySearchService) {
    this.onSelect = new EventEmitter();
    this.selectedIndex = -1;
  }

  triggerAutocomplete = (query: string): void => {
    this.citySearchService.searchCity(query).subscribe({
      next: ss => {
        this.suggestions = ss;
        if (this.selectedIndex >= ss.length) {
          this.selectedIndex = ss.length - 1;
        }
      },
      error: this.clear,
    });
  };

  moveUp(): void {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
    } else {
      this.selectedIndex = this.suggestions.length - 1;
    }
    this.onSelect.emit(this.suggestions[this.selectedIndex]);
  }

  moveDown(): void {
    if (this.selectedIndex !== this.suggestions.length - 1) {
      this.selectedIndex++;
    } else {
      this.selectedIndex = 0;
    }
    this.onSelect.emit(this.suggestions[this.selectedIndex]);
  }

  clear(): void {
    this.suggestions = [];
    this.selectedIndex = -1;
  }
}
