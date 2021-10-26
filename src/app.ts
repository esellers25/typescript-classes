// type AddFn = (a: number, b: number) => number; 
interface AddFn {
    (a: number, b: number): number; 
}

let add: AddFn; 
add = (n1: number, n2: number) => {
    return n1 + n2; 
}

interface Named {
    readonly name?: string;
    favHobby?: string; 
}

interface Greetable extends Named {
    greet(phrase: string) : void; 
}

class Person implements Greetable {
    age = 30; 

    constructor(public name?: string){
    }

    greet(phrase: string){
        if(this.name){
            console.log(phrase + ' ' + this.name)
        }
        else {
            console.log('Hi!')
        }
    }
}

let user1: Greetable; 

user1 = new Person('Erin');
let user2 = new Person();
user1.greet('Hi, my name is'); 
user2.greet('Hi, my name is'); 
// user1.name = 'Busby'; doesn't work since the readonly keyword

user1.greet(`Hi! I'm`)