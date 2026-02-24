import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-listdrop-action',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './listdrop-action.html',
    styleUrl: './listdrop-action.scss'
})
export class ListdropAction {
    @Input() item: any;
    @Output() actionClick = new EventEmitter<'AUMENTAR_STOCK' | 'TOGGLE_ESTADO'>();

    isOpen = false;

    constructor(private elementRef: ElementRef) { }

    toggleMenu() {
        this.isOpen = !this.isOpen;
    }

    onAumentarStock() {
        this.actionClick.emit('AUMENTAR_STOCK');
        this.isOpen = false;
    }

    onToggleEstado() {
        this.actionClick.emit('TOGGLE_ESTADO');
        this.isOpen = false;
    }

    @HostListener('document:click', ['$event'])
    onClickOutside(event: Event) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.isOpen = false;
        }
    }
}
