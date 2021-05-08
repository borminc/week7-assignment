<!doctype html>
<html lang="en">
  <head>
    <title>Task 2</title>
  </head>
  <body>

    <?php 

      function filter($arr, $by) {
        $newArr = [];

        foreach ($arr as $num) {
          if ($by($num)) {
            array_push($newArr, $num);
          }
        }

        return $newArr;
      }

      $arr = [2, 3, 4, 6, 7, 9, 11, 20];
      $filteredArr = filter($arr, fn($num) => !($num%2));
      
      foreach ($filteredArr as $num) {
          echo $num . '<br>';
      }

    ?>

  </body>
</html>