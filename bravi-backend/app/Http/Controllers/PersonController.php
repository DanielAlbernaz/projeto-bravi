<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePersonRequest;
use App\Http\Requests\UpdatePersonRequest;
use App\Models\Contact;
use App\Models\Person;
use Illuminate\Support\Arr;

class PersonController extends Controller
{
    public function index()
    {
        return Person::all()->load('contacts');
    }

    public function show(Person $person)
    {
        return response()->json($person->load('contacts'));
    }

    public function store(CreatePersonRequest $request)
    {
        $data = $request->validated();

        $contacts = Arr::get($data, 'contacts');
        $personData = Arr::except($data, ['contacts']);

        $person = Person::create($personData);

        foreach($contacts as $contact){
            $contact['person_id'] = $person->id;
            Contact::create($contact);
        }
        return response()->json($person->load('contacts'), 201);
    }

    public function update(UpdatePersonRequest $request, Person $person)
    {
        $data = $request->validated();

        $contacts = Arr::get($data, 'contacts');
        $personData = Arr::except($data, ['contacts']);

        $person->update($personData);
        Contact::where('person_id', $person->id)->delete();

        foreach($contacts as $contact){
            $contact['person_id'] = $person->id;
            Contact::create($contact);
        }

        return response()->json($person->load('contacts'));
    }

    public function destroy(Person $person)
    {
        $person->delete();
        return response(null, 204);
    }
}
