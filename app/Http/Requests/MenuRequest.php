<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MenuRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => "Nom maydoni to'ldirilishi shart.",
            'name.string'   => "Nom matn ko'rinishida bo'lishi kerak.",
            'name.max'      => "Nom 255 belgidan oshmasligi kerak.",
            'slug.required' => "Slug maydoni to'ldirilishi shart.",
            'slug.string'   => "Slug matn ko'rinishida bo'lishi kerak.",
            'slug.max'      => "Slug 255 belgidan oshmasligi kerak.",
        ];
    }
}
