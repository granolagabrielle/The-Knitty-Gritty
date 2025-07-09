export interface User {
  id: number;
  username: string;
  password: string;
  admin: boolean;
}

export interface PatternType {
  id: number;
  type: string;
}

export interface PatternDesigner {
  id: number;
  name: string;
}

export interface PatternDifficulty {
  id: number;
  level: string;
}

export interface Pattern {
  id: number;
  title: string;
  pattern_designer: string;
  pattern_type: string;
  difficulty_level: string;
  yarn_weight: string;
  user_id: number;
  is_favorite: boolean;
  is_deleted: boolean;
}

export interface YarnBrand {
  id: number;
  name: string;
}

export interface YarnFiber {
  id: number;
  fiber: string;
}

export interface YarnWeight {
  id: number;
  weight: string;
}

export interface Yarn {
  id: number;
  brand: string;
  title: string;
  fiber: string;
  weight: string;
  skeins: number;
  skein_grams: number;
  total_grams: number;
  dye_lot: string;
  user_id: number;
  purchase_location: string;
  is_deleted: boolean;
  is_favorite: boolean;
}

export interface ProjectNote {
  id: number;
  project_id: number;
  notes: string;
}

export interface Project {
  id: number;
  pattern_id: number;
  date_started: Date;
  est_grams_needed: number;
  grams_knit: number;
  needle_size: number;
  yarn_id: number;
  user_id: number;
  is_favorite: boolean;
  is_deleted: boolean;
}

// TODO: add images
