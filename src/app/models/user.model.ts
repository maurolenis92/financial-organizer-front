// Interface para representar un usuario
export interface UserDetail {
  categories: Category[];
  email: string;
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  color?: string;
  icon?: string;
}

export interface UserState {
  userProfile: UserDetail | null;
  initialLetters?: string;
}
