<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ArticleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'             => 'required|string|max:255',
            'author'           => 'required|string|max:255',
            'pages'            => 'required|string|max:255',
            'journal_issue_id' => 'required|integer|exists:journal_issues,id',
            'date'             => 'required|date',
            'file_url'         => 'nullable|file|mimes:pdf,doc,docx|max:10240',
            'keywords'         => 'nullable|string',
            'annotations'      => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'             => "Maqola nomi maydoni to'ldirilishi shart.",
            'name.string'               => "Maqola nomi matn ko'rinishida bo'lishi kerak.",
            'name.max'                  => "Maqola nomi 255 belgidan oshmasligi kerak.",
            'author.required'           => "Muallif maydoni to'ldirilishi shart.",
            'author.string'             => "Muallif nomi matn ko'rinishida bo'lishi kerak.",
            'author.max'                => "Muallif nomi 255 belgidan oshmasligi kerak.",
            'pages.required'            => "Sahifalar maydoni to'ldirilishi shart.",
            'pages.string'              => "Sahifalar matn ko'rinishida bo'lishi kerak.",
            'pages.max'                 => "Sahifalar 255 belgidan oshmasligi kerak.",
            'journal_issue_id.required' => "Jurnal soni tanlanishi shart.",
            'journal_issue_id.integer'  => "Jurnal soni noto'g'ri formatda.",
            'journal_issue_id.exists'   => "Tanlangan jurnal soni mavjud emas.",
            'date.required'             => "Sana maydoni to'ldirilishi shart.",
            'date.date'                 => "Sana noto'g'ri formatda kiritilgan.",
            'file_url.file'             => "Yuklangan narsa fayl bo'lishi kerak.",
            'file_url.mimes'            => "Fayl PDF, DOC yoki DOCX formatida bo'lishi kerak.",
            'file_url.max'              => "Fayl hajmi 10MB dan oshmasligi kerak.",
        ];
    }
}
