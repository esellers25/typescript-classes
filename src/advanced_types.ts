// intersection types 

type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string; 
    startDate: Date; 
};

type ElevatedEmployee = Admin & Employee; 

const e1: ElevatedEmployee = {
    name: 'Erin',
    privileges: ['override', 'resetpassword'],
    startDate: new Date()
}

type Combineable = string | number; 

// function overloads 
function addTwo(a: number, b: number) : number; 
function addTwo(a: string, b: string) : string; 
function addTwo(a: Combineable, b:Combineable){
    // the below is an example of a type guard 
    if(typeof a === 'string' || typeof b === 'string'){
        return a.toString() + b.toString();
    }
    else return a + b; 
}

const result = addTwo('Erin', 'Sellers');
result.split(''); 

// type guard #2
type UnknownEmployee = Employee | Admin; 

function employeeInfo(emp: UnknownEmployee){
    console.log('Name: ' + emp.name);
    if('privileges' in emp){
        console.log('Privileges: ' + emp.privileges);
    }
    if('startDate' in emp){
        console.log('Start Date: ' + emp.startDate)
    }
}

employeeInfo(e1); 

// type guard #3 
class Car {
    drive(){
        console.log('Driving...')
    }
}

class Truck {
    drive(){
        console.log('Hauling!')
    }

    loadCargo(amount: number){
        console.log('Loading cargo...' + amount)
    }
}

type Vehicle = Car | Truck; 

const v1 = new Car;
const v2 = new Truck; 

function useVehicle(vehicle: Vehicle){
    vehicle.drive();
    if(vehicle instanceof Truck){
        vehicle.loadCargo(1000)
    }
}

useVehicle(v1);
useVehicle(v2); 

// discriminated unions 
interface Bird {
    type: 'bird';
    flyingSpeed: number;
}

interface Horse {
    type: 'horse';
    runningSpeed: number;
}

type Animal = Bird | Horse; 

function moveAnimal(animal: Animal){
    let speed; 
    switch(animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
        break;
        case 'horse':
            speed = animal.runningSpeed; 
    } 
    console.log('Moving at speed: ' + speed);
}

moveAnimal({type: 'bird', flyingSpeed: 15})

// two examples of type casting below 
// const userInput = <HTMLInputElement>document.getElementById('user-input'); 
// const userInput = document.getElementById('user-input') as HTMLInputElement; works with React 


// still type casting, but here we implement a check to see if userInput is valid/not null; 
const userInput = document.getElementById('user-input'); 

if(userInput){
    (userInput as HTMLInputElement).value = 'Hello world'; 
}

// index properties 
interface ErrorContainer {
    [prop: string]: string; 
}

const errorBox: ErrorContainer = {
    email: 'Not a valid email',
    username: 'Must be 8 characters or more'
}


// option chaining 
const userData = {
    id: 'u1',
    name: 'Erin',
    job: {title: 'Engineer', description: 'Front End Developer'}
}; 

console.log(userData?.job.title)

//nullish coalescing 

const visitorInput = undefined; 
const storedData = visitorInput ?? 'PLACEHOLDER'; 
console.log(storedData); 