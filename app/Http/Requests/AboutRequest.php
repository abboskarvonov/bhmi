<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AboutRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'     => 'required|string|max:255',
            'type'     => 'required|string|max:255',
            'content'  => 'required|string',
            'file_url' => 'nullable|file|mimes:pdf,doc,docx,jpg,jpeg,png|max:5120',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'    => "Nom maydoni to'ldirilishi shart.",
            'name.string'      => "Nom matn ko'rinishida bo'lishi kerak.",
            'name.max'         => "Nom 255 belgidan oshmasligi kerak.",
            'type.required'    => "Tur maydoni to'ldirilishi shart.",
            'type.string'      => "Tur matn ko'rinishida bo'lishi kerak.",
            'type.max'         => "Tur 255 belgidan oshmasligi kerak.",
            'content.required' => "Kontent maydoni to'ldirilishi shart.",
            'content.string'   => "Kontent matn ko'rinishida bo'lishi kerak.",
            'file_url.file'    => "Yuklangan narsa fayl bo'lishi kerak.",
            'file_url.mimes'   => "Fayl PDF, DOC, DOCX, JPG yoki PNG formatida bo'lishi kerak.",
            'file_url.max'     => "Fayl hajmi 5MB dan oshmasligi kerak.",
        ];
    }
}
