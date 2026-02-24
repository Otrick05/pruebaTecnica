export interface ItemInventario {
    id: string;
    sku: string;
    nombre: string;
    categoria: string;
    stock: number;
    precioUnitario: number;
    estado: boolean;
    imagenUrl: string;
    proveedor: string;
}

export interface InventarioStats {
    totalProducts: number;
    totalValue: number;
    lowStock: number;
    outOfStock: number;
}

export interface PaginatedProductoResponse {
    content: ItemInventario[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}
