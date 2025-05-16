export type Repository = {
  full_name: string;
  name: string;
  ownerLogin: string;
  description: string;
  url: string;
  languages: {
    [language: string]: string
  };
  languagesAmount: number;
  license?: {
    name: string;
    url: string;
  };
};