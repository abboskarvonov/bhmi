<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JournalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'     => 'required|string|max:255',
            'date'     => 'nullable|date',
            'file_url' => 'nullable|file|mimes:pdf,doc,docx|max:10240',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => "Jurnal soni nomi maydoni to'ldirilishi shart.",
            'name.string'   => "Jurnal soni nomi matn ko'rinishida bo'lishi kerak.",
            'name.max'      => "Jurnal soni nomi 255 belgidan oshmasligi kerak.",
            'date.date'     => "Sana noto'g'ri formatda kiritilgan.",
            'file_url.file'  => "Yuklangan narsa fayl bo'lishi kerak.",
            'file_url.mimes' => "Fayl PDF, DOC yoki DOCX formatida bo'lishi kerak.",
            'file_url.max'   => "Fayl hajmi 10MB dan oshmasligi kerak.",
        ];
    }
}
