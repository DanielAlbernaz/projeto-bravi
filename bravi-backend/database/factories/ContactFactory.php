<?php

namespace Database\Factories;

use App\Models\Person;
use Illuminate\Database\Eloquent\Factories\Factory;

class ContactFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'person_id' => Person::factory(),
            'type' => $this->faker->randomElement([
                'Telefone', 'WhatsApp', 'Celular'
            ]),
            'number' => $this->faker->randomElement([
                '(62) 98257-9658', '(62) 98257-0000', '(62) 3698-9658'
            ]),
        ];
    }
}
