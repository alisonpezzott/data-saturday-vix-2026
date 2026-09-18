import type { FilterState } from '@/types';

// #region dax
function daxStr(v: string): string {
  return `"${v.replace(/"/g, '""')}"`;   // UI input never enters DAX raw
}

export function byClientQuery(f: FilterState): string {
  return `
EVALUATE
SUMMARIZECOLUMNS (
    DimCliente[NomeCliente],
    FILTER ( ALL ( DimCalendario ), DimCalendario[Ano] = ${f.ano} ),
    FILTER ( ALL ( DimCliente ), DimCliente[Regiao] = ${daxStr(f.regiao)} ),
    "ReceitaLiquida", [Receita Líquida],
    "PctMargemBruta", [% Margem Bruta]
)
ORDER BY [ReceitaLiquida] DESC`;
}
// #endregion dax
