import queryString from 'query-string';
import HttpContext from '../httpContext.js';
import Controller from './Controller.js';
import { getQueryString } from '../utilities.js';
export default class MathsController extends Controller {
    constructor(HttpContext) {
        super(HttpContext);
    }

    

    get(){
        let httpContext = HttpContext.get();
        let params = httpContext.path.params;
        let operator = params.op;
        let x = parseInt(params.x);
        let y = parseInt(params.y);
        let n = parseInt(params.n);
        
        

        if(operator == ' ' || operator == '-' || operator == '*' || operator == '/' || operator == '%'){
           if(isNaN(x)){
                params.error = "'x' is not a number or is missing";
            }
    
            if(isNaN(y)){
                params.error = "'y' is not a number or is missing";
            }
        }
        else if(operator == '!' || operator == 'p' || operator == 'np'){
            if(isNaN(n)){
                params.error = "'n' is not a number or is missing";
            }
        }
        else{
            params.error = "operation doesn't exists";
        }
        
        

        if(params.error != null){
            httpContext.response.JSON(params);
            return;
        }
        
        switch(operator){
            //addition
            case ' ': params.value = x + y; break;
            //subtraction
            case '-': params.value = x - y; break;
            //multiplication
            case '*': params.value = x * y; break;
            //division
            case '/': params.value = x/y; break;
            //modulo
            case '%': params.value = x % y; break;
            //factorial
            case '!': params.value = this.getFactorial(n); break;
            //prime
            case 'p': params.value = this.isPrime(n); break;
            //nieme prime
            case 'np': params.value = this.findPrime(n); break;

        }

        httpContext.response.JSON(params);
    }

    getFactorial(number) {
        if(number < 0){
            return -1;
        }
        else if (mumber === 0){
            return 1;
        }
        else{
            let result = 1;
            for (let i = number - 1; i >= 1; i--){
                result *= i;
            }
            return result;
        }
    }

    isPrime(x) {
        for (var i = 2; i < x; i++) {
            if(x % i === 0) {
                return false;
            }
        }
        return x > 1;
    }

    findPrime(x){
        let primeNumber = 0;
        for (let i = 0; i < x; i++){
            if (this.isPrime(i)){
                primeNumber++;
            }
        }
        return primeNumber;
    }
}
