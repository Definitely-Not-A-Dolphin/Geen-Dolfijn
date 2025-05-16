export type Repository = {
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
};