import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
const API_KEY = "yourapikey";

interface CompletionRequest {
  model: string;
  prompt: string;
  max_tokens: number;
}

interface CompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    text: string;
    index: number;
    logprobs: null;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

async function getCompletion(prompt: string, http: HttpClient): Promise<CompletionResponse> {
  const url = 'https://api.openai.com/v1/completions';
  const body: CompletionRequest = {
    model: 'text-davinci-003',
    prompt: prompt,
    max_tokens: 20,
  };
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  };
  const response = await http.post<CompletionResponse>(url, body, { headers }).toPromise();
  if (response) {
    return response;
  } else {
    throw new Error('No response received');
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class AppComponent {
  title = 'openai-angular';

  constructor(private http: HttpClient) {}

  async generate() {
    const prompt = document.querySelector('#prompt') as HTMLInputElement;
    const output = document.querySelector('#output') as HTMLDivElement;

    if (!prompt.value) {
      window.alert('Please enter a prompt');
      return;
    }

    try {
      const response = await getCompletion(prompt.value, this.http);
      output.innerHTML = response.choices[0].text;
    } catch (error) {
      console.error(error);
      window.alert('An error occurred while fetching the completion');
    }
  }
}