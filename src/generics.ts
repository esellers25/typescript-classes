// built-in generics 
// const names: Array<string> = []; // same as string[]

// const promise: Promise<string> = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('This is done!');
//     }, 2000); 
// })

function merge<T, U>(objA: T, objB: U){
    return Object.assign(objA, objB)
}

const newObj = merge({name: 'Erin'}, {age: 27}); 
console.log(newObj.name)

const newObj2 = merge({name: 'Busby', toy: 'Wiggles'}, {formerName: 'Java', age: 1})
console.log(newObj2); 

interface Lengthy {
    length: number;
}
// we create this interface for our generic type
// this says that we need to make sure that whatever type we use must have a length property 
// strings, arrays, etc would all have length properties, but numbers would not 

function countAndPrint<T extends Lengthy>(element: T): [T, string] {
    let description = "No value."; 
    if(element.length === 1) {
        description = 'There is 1 element.';
    } else if (element.length > 1){
        description = 'There are ' + element.length + ' elements.'
    }
    return [element, description]
}

console.log(countAndPrint('Hello world!'))

// keyof insures that U is a key on our object T 
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U){
    return 'Value: ' + obj[key];
}

const spookyMovie = {
    title: 'Halloween',
    director: 'John Carpenter',
    genre: 'horror',
    releaseDate: '1978'
}

console.log(extractAndConvert(spookyMovie, 'genre')); 

// generic class 
// we add the extends because our current logic only works with primitive data types 

class DataStorage<T extends string | number | boolean> {
    private data: T[] = []; 

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems(){
        return [...this.data]; 
    }
}

// note that when we create a new instance of our DataStorage class we need to specify the type of data 
const personStorage = new DataStorage<string>(); 
personStorage.addItem('Andrew'); 
personStorage.addItem('Marc');
personStorage.addItem('Ridker'); 
personStorage.removeItem('Marc');
console.log(personStorage.getItems()); 

interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date; 
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal{
    let courseGoal: Partial<CourseGoal> = {}; 
    courseGoal.title = title; 
    courseGoal.description = description; 
    courseGoal.completeUntil = date; 
    return courseGoal as CourseGoal; 
}