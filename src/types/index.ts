// src/types/index.ts

export interface University {
  id: string;
  name: string;
  location: string;
  countryRanking?: number;      
  worldRanking?: number;        
  programs: Program[];         
  scholarships: Scholarship[];    
  additionalCosts: Cost[];      
  applicationRequirements: string[]; 
  applicationDeadline?: string; 
  englishRequirements?: string; 
  image?: string;              
  logo?: string;               
  description?: string;    
  features?: string;    
  slug: string;
}

export interface Program {
  name: string;                 
  language: string;             
}

export interface Scholarship {
  type: string;                 
  benefits: string[];           
}

export interface Cost {
  name: string;                 
  amount: string;               
}


export interface Document {
  id: string;
  title: string;
  requiredFor: string;
  description: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; 
}

export interface User {
  username: string;
  password: string;
  isAdmin: boolean;
}