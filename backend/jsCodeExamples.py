TITLES = ["Beginner Level", "Intermediate Level","Advanced Level","Expert Level"]

TEMPLATES = [
    """const num =
if ( condition_is_given_here ) {
    // If the condition is met, 
    //the code  will get executed.
}
""",
    """class Person {
  constructor(name, age) {
    // Initialize name and age properties
  }
  introduce() {
    // Print a message introducing the person
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}
// Create an instance of the Person class
// Call the introduce method
""",
    """// Recursive function to calculate factorial
function factorial(n) {
    // Base case: factorial of 0 or 1 is 1
    // Recursive case: n * factorial of (n - 1)
}
console.log(factorial(n)); // Output: (factorial of the number 5)
""",
    """class Animal {
  constructor(name) {
    // Initialize name property
  }
  speak() {
    // Print that the animal makes a sound
  }
}
class Dog extends Animal {
  speak() {
    // Print that the dog barks
  }
}
const dog = new Dog(/* name */);
dog.speak();
"""
]

SOLUTIONS = [
    """const num = 5;
if (num > 0) {
    console.log("The number is positive");
}
""",
    """class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  introduce() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}
const person = new Person('Alice', 30);
person.introduce();
""",
    """
function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}
console.log(factorial(5));
""",
    """class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a sound.`);
  }
}
class Dog extends Animal {
  speak() {
    console.log(`${this.name} barks.`);
  }
}
const dog = new Dog('Rex');
dog.speak();
"""
]

DESCRIPTIONS = [
    """
In this approach, we use an if statement to check whether a specific condition is met. The code block will execute when the given condition is satisfied.
""",
    """
In this approach, we use JavaScript classes to define a blueprint for creating objects. The class contains a constructor for initializing properties and a method to perform an action.
""",
    """
In this approach, we use recursion to solve a problem. The function calls itself with a modified argument until a base case is met.
""",
    """
In this approach, we use JavaScript class inheritance to create a hierarchy of classes. The base class defines common properties and methods, while the derived class extends and overrides these methods.
"""
]

TASKS = [
    """
Initialize a variable num with the positive value 5.
Use an if statement to check if num is positive.
If the condition is met, print "The number is positive"
""",
    """
Create a class named Person with the following properties and methods:
- Constructor to initialize `name` and `age`.
- `introduce` method that prints "Hello, my name is [name] and I am [age] years old."
""",
    """
Write a recursive function named `factorial` that calculates the factorial of a number. It represents the multiplication of all numbers between 1 and n.
summon it with n=5.
""",
    """
Create an `Animal` class with:
- A `name` property.
- A `speak` method that prints "[name] makes a sound."

Create a `Dog` class that extends `Animal` and overrides the `speak` method to print "[name] barks."

Instantiate the `Dog` class and call the `speak` method.
"""
]
