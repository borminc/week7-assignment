<?php

    /*
    - Advantages of multiple inheritance:
    Multiple inheritance can be useful because it makes our code
    more reuseable as we don't have to write code that repeats
    itself. Also, it helps us stay organized since we have a clear 
    structure in our code such as attributes and methods. With OOP, 
    we try to organize our code with our logic of our solutions to 
    problems, and sometimes complex relationships can be represented 
    by multiple inheritance. This also makes code analysis easier.

    For example, a user can be a student and an employee at the same
    time, so User should inherit from Student and Employee. The code
    demonstration below gives an example of this using traits and 
    interfaces.

    - Disadvantages of multiple inheritance:
    Multiple inheritance is not allowed in some languages such as
    Java and PHP. So in order to use multiple inheritance, we have
    to translate it in other ways such as using interfaces; for 
    example, in PHP, we can use traits or interfaces to allow multiple
    inheritance. See the use of traits and inheritance for multiple
    inheritance in the example code below.

    Another disavantage is that multiple inheritance can make our
    code too complicated, especially when inheriting from many 
    classes. If there is a change in the superclasses or parent
    classes, then the subclass has to change as well.
    */


    
    // Multiple inheritance with traits
    trait Student {
        public function study() {
            echo 'Studying...' . '<br>';
        }
    }

    trait Employee {
        public function work() {
            echo 'Working...' . '<br>';
        }
    }

    class User {
        use Student, Employee;
    }

    $sok = new User();
    $sok->study();
    $sok->work();



    // Multiple inheritance with interfaces
    interface Student1 {
        public function study();
    }

    interface Employee1 {
        public function work();
    }

    class User1 implements Student1, Employee1 {
        public function study() {
            echo 'Studying...' . '<br>';
        }
        
        public function work() {
            echo 'Working...' . '<br>';
        }
    }

    $san = new User1();
    $san->study();
    $san->work();

?>