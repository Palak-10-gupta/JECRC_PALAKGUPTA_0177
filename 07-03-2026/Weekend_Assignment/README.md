# Task-1 : Student Eligibility Validation System

## Step-1: Scenario Overview

You are building a Student Eligibility Validation System for a university admission portal.

Before allowing students to apply for courses, the system must validate eligibility conditions.

Different programs have different eligibility rules:

- Engineering Program → Based on marks
- Medical Program → Based on marks + age
- Management Program → Based on marks + attendance

### Key Constraints

- Eligibility rules may change every academic year
- Validation logic must be reusable
- Core validation engine must remain unchanged
- Validation logic should return true or false

This requirement demands condition-based validation using **Predicate**.

---

## Step-2: Functional Requirements

### 2.1 Entity Class

Student

### Properties

- int StudentId
- string Name
- int Marks
- int Age
- int Attendance

---

### 2.2 Predicate Definition

Predicate<Student>

Purpose:

- Represents an eligibility condition
- Accepts a Student object
- Returns true if eligible, otherwise false

---

### 2.3 Eligibility Rule Definitions

EngineeringEligibility  
Marks ≥ 60 → Eligible

MedicalEligibility  
Marks ≥ 70 AND Age ≥ 17 → Eligible

ManagementEligibility  
Marks ≥ 55 AND Attendance ≥ 75 → Eligible

---

## Step-3: Eligibility Engine (Core Component)

EligibilityEngine Responsibilities

- Accept Student data
- Accept Predicate<Student>
- Invoke predicate
- Display eligibility status

Important Design Rule

EligibilityEngine must NOT contain eligibility rules.

Core Method

CheckEligibility(Student student, string program, Predicate<Student> rule)

---

## Step-4: Main() Method – Runtime Configuration

1. Create student object  
2. Define eligibility predicates  
3. Create eligibility engine  
4. Validate eligibility for Engineering  
5. Validate eligibility for Medical  
6. Validate eligibility for Management  

---

## Step-5: Hardcoded Dataset

StudentId : 301  
Name : Ananya  
Marks : 78  
Age : 18  
Attendance : 85  

---

## Step-6: Expected Output

========= ELIGIBILITY CHECK =========  
Student Name : Ananya  
Program : Engineering  
Eligible : True  
-----------------------------------

========= ELIGIBILITY CHECK =========  
Student Name : Ananya  
Program : Medical  
Eligible : True  
-----------------------------------

========= ELIGIBILITY CHECK =========  
Student Name : Ananya  
Program : Management  
Eligible : True  
-----------------------------------

---

# Task 2 : Student Performance Analysis System

## Step-1: Scenario Overview

You are building a Student Performance Analysis System for a university.

The system must analyze student records stored in collections using **LINQ**.

Analysis requirements include:

- Filtering students who passed
- Identifying toppers
- Sorting students by marks
- Calculating average marks

### Key Constraints

- Data is stored in memory
- Queries must be readable
- No manual loops

---

## Step-2: Functional Requirements

### 2.1 Entity Class

Student

Properties:

- int StudentId
- string Name
- int Marks

---

### 2.2 LINQ Usage

LINQ is used to:

- Filter (Where)
- Sort (OrderByDescending)
- Aggregate (Average)
- Project (Select)

---

### 2.3 LINQ Operations Required

Pass Students  
Marks ≥ 50

Topper Identification  
Highest marks

Sorting  
Sort by marks descending

---

## Step-3: Analysis Engine

Responsibilities

- Accept student collection
- Apply LINQ queries
- Display results

Important Rule

Only LINQ expressions must be used.

---

## Step-4: Main() Method

1. Create student collection  
2. Populate hardcoded student data  
3. Create analysis engine  
4. Apply LINQ query for passed students  
5. Apply LINQ query for toppers  
6. Apply LINQ query for sorted list  

---

## Step-5: Hardcoded Dataset

101, Ananya, 78  
102, Ravi, 45  
103, Neha, 88  
104, Arjun, 67  

---

## Step-6: Expected Output

Passed Students:  
Ananya  
Neha  
Arjun  

Topper:  
Neha - 88  

Students Sorted by Marks:  
Neha - 88  
Ananya - 78  
Arjun - 67  
Ravi - 45  

---

# Task-3 : Product Inventory Management System

## Step-1: Scenario Overview

You are building a Product Inventory Management System for a retail store.

Inventory analysis must be performed using **LINQ**.

Requirements:

- Filter low-stock products
- Sort products by price
- Calculate total inventory value

---

## Step-2: Functional Requirements

### Entity Class

Product

Properties:

- int ProductId
- string Name
- double Price
- int Quantity

---

### LINQ Usage

- Filter → Where
- Sort → OrderBy
- Aggregate → Sum

---

### LINQ Operations Required

Low Stock Products  
Quantity < 10

Price Sorting  
Ascending order

Inventory Value  
Price × Quantity

---

## Step-3: Inventory Engine

Responsibilities

- Accept product collection
- Apply LINQ queries
- Display reports

Important Rule

No traditional loops.

---

## Step-4: Main() Method

1. Create product list  
2. Add hardcoded inventory data  
3. Create inventory engine  
4. Filter low stock products  
5. Sort products by price  
6. Calculate inventory value  

---

## Step-5: Hardcoded Dataset

201, Laptop, 60000, 5  
202, Mouse, 800, 25  
203, Keyboard, 1500, 8  
204, Monitor, 12000, 12  

---

## Step-6: Expected Output

Low Stock Products:  
Laptop  
Keyboard  

Products Sorted by Price:  
Mouse - 800  
Keyboard - 1500  
Monitor - 12000  
Laptop - 60000  

Total Inventory Value:  
Rs 476000  

---

# Task-4 : Employee Promotion Validation System

## Step-1: Scenario Overview

You are building an Employee Promotion Validation System.

HR must validate promotion eligibility rules.

Rules differ by department.

Technical → Experience  
HR → Experience + performance  
Management → Experience + salary

---

## Step-2: Functional Requirements

### Entity Class

Employee

Properties:

- int EmployeeId
- string Name
- int Experience
- double Salary
- int PerformanceRating

---

### Predicate Definition

Predicate<Employee>

Used for promotion eligibility validation.

---

### Promotion Rules

TechnicalPromotionRule  
Experience ≥ 3

HRPromotionRule  
Experience ≥ 2 AND PerformanceRating ≥ 4

ManagementPromotionRule  
Experience ≥ 5 AND Salary ≥ 60000

---

## Step-3 : Promotion Engine

Responsibilities

- Accept Employee
- Accept Predicate<Employee>
- Invoke rule
- Display promotion status

Core Method

Validate(Employee employee, string department, Predicate<Employee> rule)

---

## Step-4: Main() Method

1. Create employee object  
2. Define promotion predicates  
3. Create promotion engine  
4. Validate Technical department  
5. Validate HR department  
6. Validate Management department  

---

## Step-5: Hardcoded Dataset

EmployeeId : 501  
Name : Ravi  
Experience : 5  
Salary : 65000  
Rating : 4  

---

## Step-6: Expected Output

========= PROMOTION VALIDATION =========  
Employee Name : Ravi  
Department : Technical  
Eligible : True  
--------------------------------------

========= PROMOTION VALIDATION =========  
Employee Name : Ravi  
Department : HR  
Eligible : True  
--------------------------------------

========= PROMOTION VALIDATION =========  
Employee Name : Ravi  
Department : Management  
Eligible : True  
--------------------------------------

---

# Task-5 : Employee Salary Analytics System

## Step-1: Scenario Overview

You are building an Employee Salary Analytics System.

HR needs insights using **LINQ**.

Analytics requirements:

- Filtering high salary employees
- Sorting employees by salary
- Calculating average salary

---

## Step-2: Functional Requirements

### Entity Class

Employee

Properties:

- int EmployeeId
- string Name
- double Salary

---

### LINQ Usage

- Where
- OrderByDescending
- Average

---

### LINQ Operations Required

High Salary Employees  
Salary ≥ 50000

Salary Sorting  
Descending

Average Salary  
Compute average

---

## Step-3: Analytics Engine

Responsibilities

- Accept employee collection
- Apply LINQ queries
- Display analytics results

Important Rule

No loops allowed.

---

## Step-4: Main() Method

1. Create employee list  
2. Populate hardcoded employee data  
3. Create analytics engine  
4. Filter high salary employees  
5. Sort employees by salary  
6. Calculate average salary  

---

## Step-5: Hardcoded Dataset

301, Ramesh, 45000  
302, Suresh, 52000  
303, Kavya, 68000  
304, Anita, 39000  

---

## Step-6: Expected Output

High Salary Employees:  
Suresh  
Kavya  

Employees Sorted by Salary:  
Kavya - 68000  
Suresh - 52000  
Ramesh - 45000  
Anita - 39000  

Average Salary:  
Rs 51000