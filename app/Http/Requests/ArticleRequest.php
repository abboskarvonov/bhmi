<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ArticleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'pages' => 'required|string|max:255',
            'journal_issue_id' => 'required|integer|exists:journal_issues,id',
            'date' => 'required|date',
            'file_url' => 'nullable|file|mimes:pdf,doc,docx|max:10240',
            'keywords' => 'nullable|string',
            'annotations' => 'nullable|string',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'The name field is required.',
            'author.required' => 'The author field is required.',
            'pages.required' => 'The pages field is required.',
            'journal_issue_id.required' => 'The journal issue ID field is required.',
            'journal_issue_id.exists' => 'The selected journal issue ID is invalid.',
            'date.required' => 'The date field is required.',
            'date.date' => 'The date is not a valid date format.',
            'file_url.file' => 'The file URL must be a file.',
            'file_url.mimes' => 'Fayl PDF, DOC yoki DOCX formatida bo\'lishi kerak.',
            'file_url.max' => 'Fayl hajmi 10MB dan oshmasligi kerak.',
        ];
    }
}