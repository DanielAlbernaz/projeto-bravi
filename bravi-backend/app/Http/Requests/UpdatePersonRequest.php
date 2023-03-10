<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePersonRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required', 'string'],
            'cpf' => ['required', 'string'],
            'email' => ['required', 'email'],
            'contacts' => 'array',
            'contacts.type' => ['in:Telefone,WhatsApp,Celular', 'string'],
            'contacts.number' => ['in:Telefone,WhatsApp,Celular', 'string', 'max:16'],
        ];
    }
}
