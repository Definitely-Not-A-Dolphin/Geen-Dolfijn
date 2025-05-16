export type Repository = {
  id: number;
  full_name: string;
  name: string;
  ownerLogin: string;
  description: string;
  url: string;
  languages: {
    [language: string]: string
  };
  license?: {
    name: string;
    url: string;
  };
  stargazers_count: number;
};