<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LoadDataTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    use RefreshDatabase;
    public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
    public function it_loads_data_from_the_database()
    {
        

        // Step 2: Act - retrieve data from the database
        $data = User::where('deleted_at', null)->get();

        // Step 3: Assert - check if data is loaded correctly
        $this->assertNotNull($data);
        $this->assertEquals('Test Data', $data->name);
    }
}
