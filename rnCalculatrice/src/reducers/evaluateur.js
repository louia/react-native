function ExceptionExpressionInvalide(message) {
    this.message = message;
    this.name = 'ExceptionExpressionInvalide';
}

export default function evaluateur(expression) {
    let regNumber = '(-?[0-9]+(e\\+-?[0-9]+)?)';
    let regOperator = '([%/+-x])';
    let exprValide = new RegExp('^$|^' + regNumber + '(' + regOperator + regNumber + ')*$');

    if (!exprValide.test(expression)) throw new ExceptionExpressionInvalide('Expression [' + expression + '] invalide');

    // eslint-disable-next-line
    let m = /x/g;
    return expression === '' ? '' : String(Math.floor(eval(expression.replace(m, '*'))));
}

export { evaluateur };
