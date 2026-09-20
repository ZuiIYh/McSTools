import {RequirementStatistic} from "./requirements.ts";

const escapeCsvField = (field: string): string => {
    
    let escaped = field.replace(/"/g, '""');

    
    if (escaped.includes(',') || escaped.includes('\n') || escaped.includes('"') || escaped.includes('\r')) {
        escaped = `"${escaped}"`;
    }
    return escaped;
};

const exportCsv = (filename: string, headers: string[], rows: string[][]) => {
    const csvContent = [
        headers.join(','), 
        ...rows.map(row => row.join(',')) 
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' }); 
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const exportRequirementsStatsToCsv = (
    name: string,
    stats: RequirementStatistic[],
    filename: string = `${name}_requirements.csv`
) => {
    const headers = ['ID', '中文', '数量', '占比 (%)'];

    const rows = stats.map(item => [
        escapeCsvField(item.id),
        escapeCsvField(item.zh_cn),
        item.num.toString(),
        item.percentage.toString()
    ]);

    exportCsv(filename, headers, rows);
};