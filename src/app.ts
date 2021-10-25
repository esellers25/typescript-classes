class Department {
    private employees: string[] = [];
    
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

const accounting = new Department("Accounting", 15); 
accounting.addEmployee("Stephanie");
accounting.addEmployee("Natalie");
accounting.describe();
accounting.printEmployeeInfo(); 

accounting.name = "Business Finances";
accounting.describe(); 

// const accountingCopy = { name: "duplicate", describe: accounting.describe };

// accountingCopy.describe(); 