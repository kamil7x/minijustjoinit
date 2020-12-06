export const PAGE_SIZE = 24;

export const getTotalPages = (data: any[]) => Math.ceil(data.length / PAGE_SIZE);
