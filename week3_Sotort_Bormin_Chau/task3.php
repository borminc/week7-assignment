<!doctype html>
<html lang="en">
  <head>
    <title>Task 3</title>
  </head>
  <body>

    <?php 

       function sum(...$nums) {
           $sum = 0;
           foreach ($nums as $num) {
               $sum += $num;
           }
           return $sum;
       }

       $total = sum(2, 3);
       echo $total . '<br>';

       $total = sum(2, 3, 4);
       echo $total . '<br>';

       $total = sum(2, 3, 4, 5);
       echo $total . '<br>';

    ?>

  </body>
</html>