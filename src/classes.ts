class Department {
    protected employees: string[] = [];
    
    //this is the faster way to initialize properties in Typescript
    //note that you do have to explicitly type public or private here 
    constructor(public name: string, private readonly id: number){
        
    }

    describe(this: Department) {
        console.log(`Department: ${this.name} (${this.id})`); 
    }

    addEmployee(employee: string){
        this.employees.push(employee);
    }

    printEmployeeInfo(){
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

class ITDepartment extends Department {
    private firstAdmin: string; 
    private static instance: ITDepartment; 
    
    private constructor(id: number, private admins: string[]){
        super('IT', id); 
        this.firstAdmin = this.admins[0]; 
        this.addAdmins(admins); 
    }

    static getInstance(){
        if(this.instance){
            return this.instance; 
        }
        this.instance = new ITDepartment(21, ['Erin', 'Jon']); 
        return this.instance; 
    }

    addAdmins(adminList: string[]){
        adminList.forEach(admin => this.addEmployee(admin)); 
    }

    isAdmin(name: string){
        if(this.admins.filter(admin => admin === name).length === 1) {
            return true; 
        } else return false; 
    }

    get primaryAdmin() {
        if(this.firstAdmin){
            return this.firstAdmin; 
        }
        throw new Error('No admins found.')
    }

    set primaryAdmin(name: string) {
        this.admins.unshift(name); 
        this.addEmployee(name);
        this.firstAdmin = name; 
    }
}

class EditorialDepartment extends Department {
    constructor(name: string, id: number, public titles: string[]){
        super(`${name} Editorial`, id)
    }

    addTitle(name: string){
        this.titles.push(name)
    }

    printTitles(){
        console.log(this.titles, this.titles.length)
    }
}

const accounting = new Department("Accounting", 15); 
accounting.addEmployee("Stephanie");
accounting.addEmployee("Natalie");
accounting.describe();
accounting.printEmployeeInfo(); 

accounting.name = "Business Finances";
accounting.describe(); 

const itDept = ITDepartment.getInstance(); 
itDept.describe();
itDept.printEmployeeInfo(); 
console.log(itDept.primaryAdmin);
itDept.primaryAdmin = 'Tammy';
console.log(itDept.primaryAdmin);

const knopf = new EditorialDepartment('Knopf', 35, ['Beloved', 'Open', 'Bad Blood'])


// const accountingCopy = { name: "duplicate", describe: accounting.describe };

// accountingCopy.describe(); 