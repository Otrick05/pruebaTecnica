import { Component, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export type HistorialFilterOption = 'todos' | 'entrada' | 'salida';

@Component({
    selector: 'app-listdropfiltro-historial',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './listdropfiltro-historial.component.html',
    styleUrl: './listdropfiltro-historial.component.scss'
})
export class ListdropfiltroHistorialComponent {
    isOpen = signal(false);
    selectedOption = signal<HistorialFilterOption>('todos');

    @Output() filterChange = new EventEmitter<HistorialFilterOption>();

    toggleDropdown() {
        this.isOpen.update(v => !v);
    }

    selectOption(option: HistorialFilterOption) {
        this.selectedOption.set(option);
        this.filterChange.emit(option);
        this.isOpen.set(false);
    }
}
