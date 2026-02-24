export interface HistorialProducto {
    id: number;
    productoId: number;
    nombreProducto: string;
    motivo?: string;
    destino?: string;
    tipoMovimiento: 'ENTRADA' | 'SALIDA';
    fecha?: string | Date;
    realizadoPor?: string;
}

export interface PaginatedHistorialResponse {
    content: HistorialProducto[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}
