<?php

namespace App\Events;


use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class OrderCreated implements ShouldBroadcastNow
{
    use Dispatchable,SerializesModels;

    public array $order;

    public function __construct($order)
    {
        $this->order = $order;
    }

    public function broadcastOn()
    {
        return ['orders']; // Channel name
    }

    public function broadcastWith()
    {
        return [
            'name' => $this->order['name'],
            'price' => $this->order['price'],
        ];
    }
}

