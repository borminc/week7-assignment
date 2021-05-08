<?php

require_once('PayABA.php');
require_once('PayPiPay.php');
require_once('PayWing.php');

class OrderInfo {

    private $record = []; // stores all payment records

    public function addOrder(
        $product,
        $quan,
        $method
    ) {
        $newOrder;
        switch ($method) {
            case 'ABA':
                $newOrder = new PayABA($product, $quan, $method);
                break;
            case 'PiPay':
                $newOrder = new PayPiPay($product, $quan, $method);
                break;
            case 'Wing':
                $newOrder = new PayWing($product, $quan, $method);
                break;

            // new payment methods can be simply added in another case which calls
            // its own class to create a new object (like above)
        }

        array_push($this->record, $newOrder);
    }

    public function getPaymentInfo() {
        $info['ABA'] = PayABA::$count;
        $info['PiPay'] = PayPiPay::$count;
        $info['Wing'] = PayWing::$count;
        // info of new payment methods can be accessed the same way
        // using static class var

        $info['tableData'] = $this->record;
        usort($info['tableData'], fn($a, $b) => $b->total <=> $a->total);
        
        return $info;
    }
}

?>