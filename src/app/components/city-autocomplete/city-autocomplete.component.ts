import { Component, EventEmitter, Output } from '@angular/core';
import { City } from 'src/app/model/city.model';
import { CitySearchService } from 'src/app/services/city-search.service';

@Component({
  selector: 'app-city-autocomplete',
  templateUrl: './city-autocomplete.component.html',
  styleUrls: ['./city-autocomplete.component.css']
})
export class CityAutocompleteComponent {
  @Output() onSelect: EventEmitter<string>;

  suggestions: City[];
  selectedIndex: number;
  closed: boolean; // for the case then response comes after user hit enter

  constructor(private citySearchService: CitySearchService) {
    this.onSelect = new EventEmitter();
    this.selectedIndex = -1;
  }

  triggerAutocomplete = (query: string): void => {
    this.closed = false;
    this.citySearchService.searchCity(query).subscribe({
      next: ss => {
        this.suggestions = (!this.closed) ? ss : [];
        if (this.selectedIndex >= ss.length) {
          this.selectedIndex = ss.length - 1;
        }
      },
      error: () => this.clear(),
    });
  };

  moveUp(): void {
    if (this.selectedIndex > 0) {
      this.selectedIndex--;
    } else {
      this.selectedIndex = this.suggestions.length - 1;
    }
    if (this.suggestions[this.selectedIndex]?.name) {
      this.onSelect.emit(this.suggestions[this.selectedIndex].name);
    }
  }

  moveDown(): void {
    if (this.selectedIndex !== this.suggestions.length - 1) {
      this.selectedIndex++;
    } else {
      this.selectedIndex = 0;
    }
    if (this.suggestions[this.selectedIndex]?.name) {
      this.onSelect.emit(this.suggestions[this.selectedIndex].name);
    }
  }

  clear(): void {
    this.suggestions = [];
    this.selectedIndex = -1;
    this.closed = true;
  }
}
