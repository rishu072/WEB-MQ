// 1. Even Numbers + Square

const numbers = [2, 5, 8, 11, 14, 17, 20];

const evenSquares = numbers
  .filter(num => num % 2 === 0)
  .map(num => num * num);

console.log("Even Numbers Squared:", evenSquares);

// 2. Uppercase Names

let names = ["priya", "rahul", "amir", "sara"];

const upperNames = names.map(name => name.toUpperCase());

console.log("Uppercase Names:", upperNames);

// 3. Find Maximum using reduce()

const arr = [34, 12, 89, 56, 23, 90, 7];

const maxNumber = arr.reduce((max, current) => {
  return current > max ? current : max;
});

console.log("Maximum Number:", maxNumber);

// 4. Product Filter + Map

const products = [
  { name: "Laptop", price: 65000, category: "Electronics" },
  { name: "Shirt", price: 1200, category: "Clothing" },
  { name: "Mobile", price: 30000, category: "Electronics" },
  { name: "Book", price: 500, category: "Education" },
  { name: "Headphones", price: 2500, category: "Electronics" }
];

const electronicProducts = products
  .filter(product => product.category === "Electronics")
  .map(product => product.name);

console.log("Electronic Products:", electronicProducts);

// 5. BONUS - Average Marks (>50)

const students = [
  { name: "Riya", marks: 85 },
  { name: "Rahul", marks: 45 },
  { name: "Amit", marks: 72 },
  { name: "Sara", marks: 90 },
  { name: "Karan", marks: 38 }
];

const passedStudents = students.filter(student => student.marks > 50);

const averageMarks =
  passedStudents.reduce((sum, student) => sum + student.marks, 0) /
  passedStudents.length;

console.log("Average Marks (>50):", averageMarks);