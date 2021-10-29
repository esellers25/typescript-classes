// example of a first class decorator 
// function Logger(constructor: Function){
//     console.log('Logging...')
//     console.log(constructor)
// }


// DECORATOR FACTORY EXAMPLES 
function Logger(comment: string){
    console.log('LOGGER FACTORY')
    return function(constructor: Function){
        console.log(comment);
        console.log(constructor);
    }
}

function WithTemplate(template: string, hookId: string){
    console.log('template factory')
    return function(constructor: any){
        const hookEl = document.getElementById(hookId);
        const p = new constructor(); 
        if (hookEl){
            hookEl.innerHTML = template;
            hookEl.querySelector('h1')!.textContent = p.name
        }
    }
}

@Logger('I am logged!')
@WithTemplate('<h1>New Person Object</h1>', 'app')
// @Logger('something to log')
class Individual {
    name = 'Erin'; 

    constructor(){
        console.log('Creating new person object...')
    }
}

let p1 = new Individual(); 
console.log(p1); 

// --- 

class Product {
    constructor(public title: string, public _price: number){

    }

    set price(val: number){
        if(val > 0){
            this._price = val; 
        } else {
            throw new Error('Invalid price - should be positive!'); 
        }
    }

    getPriceWithTax(tax:number){
        return this._price * (1 + tax)
    }
}