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
    // the line below says that our generic type T is a type of object that will take in any number of arguments
    // it will return an object that contains a key of name with a string value 
    return function<T extends {new(...args: any[]): {name: string}}>(originalConstructor: T){
        return class extends originalConstructor {
            constructor(..._: any[]){
                super();
                const hookEl = document.getElementById(hookId);
                if (hookEl){
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name
                }
            }
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

function Log(target: any, propertyName: string){
    console.log('Property decorator');
    console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accessor decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor){
    console.log('Method decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number){
    console.log('Parameter decorator!');
    console.log(target);
    console.log(name);
    console.log(position);
}

class Product {
    @Log
    title: string; 
    constructor(t: string, public _price: number){
        this.title = t; 
    }

    @Log2
    set price(val: number){
        if(val > 0){
            this._price = val; 
        } else {
            throw new Error('Invalid price - should be positive!'); 
        }
    }

    @Log3
    getPriceWithTax(@Log4 tax:number){
        return this._price * (1 + tax)
    }
}

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor){
    // description.value gives us access to the original method 
    const originalMethod = descriptor.value; 
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false, 
        // the below line allows us to do extra work before we execute the function
        // it's like having a value property that has extra logic that runs before the value is returned 
        // here, this refers to whatever is responsible for triggering this get method 
        // it will always refer to the object on which we call the getter method 
        // it's a different way of binding 'this' to the instance object 
        get() {
            const boundFn = originalMethod.bind(this); 
            return boundFn;
        }
    };
    return adjDescriptor; 
}

class Printer {
    message = 'This works';

    @Autobind
    showMessage(){
        console.log(this.message);
    }
}

const p = new Printer();

const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage)

// validation with decorators 

interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[] // ['required', 'positive']
    }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string){
    // this line below gets the name of the function 
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['required']
    }
}

function PositiveNumber(target: any, propName: string){
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['positive']
    }
}

function validate(obj: any){
    const objValidatorConfig = registeredValidators[obj.constructor.name]; 
    if(!objValidatorConfig){
        return true; 
    }
    let isValid = true; 
    for( const prop in objValidatorConfig){
        for(const validator of objValidatorConfig[prop]){
            switch(validator){
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0; 
                    break; 
            }
        }
    }
    return isValid; 
}

class Course {
    @Required
    title: string; 
    @PositiveNumber
    price: number; 

    constructor(t: string, p: number){
        this.title = t; 
        this.price = p; 
    }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleElmt = document.getElementById('title') as HTMLInputElement; 
    const priceElmt = document.getElementById('price') as HTMLInputElement; 

    const title = titleElmt.value; 
    const price = +priceElmt.value;

    const newCourse = new Course(title, price); 

    if(!validate(newCourse)){
        alert('Invalid input, please try again');
        return; 
    }
    console.log(newCourse)
})