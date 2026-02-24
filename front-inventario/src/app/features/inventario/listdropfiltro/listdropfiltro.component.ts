import { Component, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export type FilterOption = 'todos' | 'habilitados' | 'deshabilitados';

@Component({
    selector: 'app-listdropfiltro',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './listdropfiltro.component.html',
    styleUrl: './listdropfiltro.component.scss'
})
export class ListdropfiltroComponent {
    isOpen = signal(false);
    selectedOption = signal<FilterOption>('todos');

    @Output() filterChange = new EventEmitter<FilterOption>();

    toggleDropdown() {
        this.isOpen.update(v => !v);
    }

    selectOption(option: FilterOption) {
        this.selectedOption.set(option);
        this.filterChange.emit(option);
        this.isOpen.set(false);
    }
}
