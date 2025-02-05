export interface ApiResponse<T> {
    data?: T;
    error?: string;
    message?: string;
    statuscode?: number;
  }


export interface Dessert {
    name: string;
    calories: number;
    fat: number;
    carbs: number;
    protein: number;
    chestfat: number;
    bodyfat: number;
    height: number;
    weight: number;
    fatperc: number;
  };