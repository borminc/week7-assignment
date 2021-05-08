<!doctype html>
<html lang="en">
  <head>
    <title>Task 1</title>
  </head>
  <body>

    <?php 

      function cutWord($s, $separator = " ") {
        $word = "";
        $arr = [];
        $length = strlen($s);
        for ($i = 0; $i < $length; $i++) {
          if ($s[$i] == $separator) {
            if ($word == "") continue;
            
            array_push($arr, $word);
            $word = "";
          } else {
            $word .= $s[$i];
          }
        }
        if ($word != "") {
          array_push($arr, $word);
        }
        return $arr;
      }

      function reverse($s) {
          $s = cutWord($s, " ");
          $output = "";
          foreach($s as $word) {
              for ($i = strlen($word)-1; $i >= 0; $i--) {
                $output .= $word[$i];
              }
              $output .= " ";
          }
          return $output;
      }

      $input = "emocleW ot PHP";
      $output = reverse($input);
      echo $output;

    ?>

    <div> sdbfgfe
      </div>

  </body>
</html>