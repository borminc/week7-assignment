<!doctype html>
<html lang="en">
  <head>
    <title>Task 2</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  </head>
  <body>
    <?php
        require_once('libs/OrderInfo.php');
        require_once('libs/Product.php');

        $a = new OrderInfo();

        $a->addOrder(new Product('Item 1', 5), 1, 'ABA');
        $a->addOrder(new Product('Item 2', 3), 2, 'Wing');
        $a->addOrder(new Product('Item 3', 4), 1, 'ABA');
        $a->addOrder(new Product('Item 4', 5), 1, 'ABA');
        $a->addOrder(new Product('Item 5', 6), 1, 'PiPay');
        $a->addOrder(new Product('Item 6', 10), 1, 'ABA');
        $a->addOrder(new Product('Item 7', 15), 1, 'Wing');
        $a->addOrder(new Product('Item 8', 2), 1, 'Wing');

        $info = $a->getPaymentInfo();
    ?>

    <h3 class="text-center mt-5"> Order information </h3>

    <div class="m-5">
        <ul>
            <li>
                Number of sales by ABA method: <?php echo $info['ABA']?>
            </li>
            <li>
                Number of sales by PiPay and Wing methods: <?php echo $info['PiPay'] + $info['Wing']?>
            </li>
        </ul>

        <h5 class="mt-5"> All sales ordered by the biggest total amount </h5>
        <table class="table table-striped">
            <thead>
                <th scope="col"> Item </th>
                <th scope="col"> Price </th>
                <th scope="col"> Quantity </th>
                <th scope="col"> Method </th>
                <th scope="col"> Total </th>
            </thead>

            <tbody>
                <?php
                    foreach ($info['tableData'] as $item) {
                        echo '<tr>';
                        echo '<td>' . $item->name . '</td>';
                        echo '<td>' . $item->price . '</td>';
                        echo '<td>' . $item->quan . '</td>';
                        echo '<td>' . $item->method . '</td>';
                        echo '<td>' . $item->total . '</td>';
                        echo '</tr>';
                    }
                ?>
            </tbody>
        </table>
    </div>

  </body>
</html>