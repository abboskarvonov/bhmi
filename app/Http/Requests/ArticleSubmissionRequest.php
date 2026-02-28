<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ArticleSubmissionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'     => 'required|string|max:255',
            'file_url' => 'required|file|mimes:pdf,doc,docx|max:10240',
            'comment'  => 'nullable|string|max:2000',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'     => 'Maqola nomi majburiy.',
            'file_url.required' => 'Maqola fayli majburiy.',
            'file_url.mimes'    => 'Fayl faqat PDF, DOC yoki DOCX formatida bo\'lishi kerak.',
            'file_url.max'      => 'Fayl hajmi 10 MB dan oshmasligi kerak.',
        ];
    }
}
