<?php

require_once('Payment.php');

class PayABA extends Payment {

    public static $count = 0; // track number of order through this static var

    public function __construct(
        $product,
        $quan,
        $method
    ) {
        $this->name = $product->name;
        $this->price = $product->price;
        $this->quan = $quan;
        $this->method = $method;
        $this->total = $product->price * $quan;
          
        self::$count++;
    }

    public function __destruct() {
        self::$count--;
    }
}

?>