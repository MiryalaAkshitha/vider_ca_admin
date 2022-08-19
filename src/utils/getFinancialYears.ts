export const getFinancialYears = () => {
  let fiscalYears: string[] = [];
  for (let i = 0; i < 50; i++) {
    const year = new Date().getFullYear() - i;
    const fiscalYear = `${year}-${year + 1}`;
    fiscalYears.push(fiscalYear);
  }
  return fiscalYears;
};
