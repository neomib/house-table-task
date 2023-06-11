export function calcRisk(currentValue: number, loanAmount: number) {
    if (currentValue && loanAmount) {
        const ratio = loanAmount / currentValue;
        return ratio > 0.5 ? ratio + 0.1 : ratio;
    }
    else {
        return 0;
    }
}