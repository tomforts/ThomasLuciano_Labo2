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
        
        
        switch(operator){
            case ' ': params.value = x + y; break;
            case '/': params.value = x/y; break;
            case '*': params.value = x * y; break;
            case '-': params.value = x - y; break; 
        }
        

        httpContext.response.JSON(params);
     



    }
}
