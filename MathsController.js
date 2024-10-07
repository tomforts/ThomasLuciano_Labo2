import queryString from 'query-string';
import HttpContext from '../httpContext.js';
import Controller from './Controller.js';
import { getQueryString } from '../utilities.js';

export default class MathsController extends Controller {
    constructor(HttpContext) {
        super(HttpContext);
    }

    get() {
        let params = this.HttpContext.path.params;
        let operator = params.op;
        let x = parseInt(params.x);
        let y = parseInt(params.y);
        let n = parseInt(params.n);

        let result = this.processOperation(operator, x, y, n, params);
        this.HttpContext.response.JSON(result);
    }

    post() {
        let body = this.HttpContext.body;
        let operator = body.op;
        let x = parseInt(body.x);
        let y = parseInt(body.y);
        let n = parseInt(body.n);

        let result = this.processOperation(operator, x, y, n);
        this.HttpContext.response.JSON(result);
    }

    put() {
        let body = this.HttpContext.body;
        let operator = body.op;
        let x = parseInt(body.x);
        let y = parseInt(body.y);
        let n = parseInt(body.n);

        let result = this.processOperation(operator, x, y, n);
        this.HttpContext.response.JSON(result);
    }

    remove() {
        let params = this.HttpContext.path.params;
        let operator = params.op;
        let x = parseInt(params.x);
        let y = parseInt(params.y);
        let n = parseInt(params.n);

        let result = this.processOperation(operator, x, y, n);
        if (!result.error) {
            result.message = `Operation ${operator} with ${x !== undefined ? `x=${x} and y=${y}` : `n=${n}`} has been removed`;
        }
        this.HttpContext.response.JSON(result);
    }

    processOperation(operator, x, y, n, params = {}) {
        let result = {};

        if (['+', ' ', '-', '*', '/', '%'].includes(operator)) {
            if (Object.keys(params).length > 3) { result.error = "There are too many parameters"; }
            else if (Object.keys(params).length < 3) { result.error = "There are not enough parameters"; }
            else if (isNaN(x)) { result.error = "'x' is not a number or is missing"; }
            else if (isNaN(y)) { result.error = "'y' is not a number or is missing"; }
            else {
                switch (operator) {
                    case '+': result.value = x + y; break;
                    case ' ': result.value = x + y; break;
                    case '-': result.value = x - y; break;
                    case '*': result.value = x * y; break;
                    case '/': result.value = x / y; break;
                    case '%': result.value = x % y; break;
                }
            }
        } else if (['!', 'p', 'np'].includes(operator)) {
            if (Object.keys(params).length > 2) { result.error = "There are too many parameters"; }
            else if (Object.keys(params).length < 2) { result.error = "There are not enough parameters"; }
            else if (isNaN(n)) { result.error = "'n' is not a number or is missing"; }
            else if (n <= 0) { result.error = "'n' parameter must be an integer > 0"; }
            else {
                switch (operator) {
                    case '!': result.value = this.getFactorial(n); break;
                    case 'p': result.value = this.isPrime(n); break;
                    case 'np': result.value = this.findPrime(n); break;
                }
            }
        } else {
            result.error = "operation doesn't exist";
        }

        return result;
    }

    getFactorial(number) {
        if (number < 0) {
            return -1;
        } else if (number === 0) {
            return 1;
        } else {
            let result = 1;
            for (let i = number - 1; i >= 1; i--) {
                result *= i;
            }
            return result;
        }
    }

    isPrime(x) {
        for (let i = 2; i < x; i++) {
            if (x % i === 0) {
                return false;
            }
        }
        return x > 1;
    }

    findPrime(x) {
        let primeNumber = 0;
        for (let i = 0; i < x; i++) {
            if (this.isPrime(i)) {
                primeNumber++;
            }
        }
        return primeNumber;
    }
}