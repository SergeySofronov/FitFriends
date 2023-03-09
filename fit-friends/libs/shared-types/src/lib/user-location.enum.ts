export enum Location {
  Pionerskaya = 'Pionerskaya',
  Petrogradskaya = 'Petrogradskaya',
  Udelnaya = 'Udelnaya',
  Zvyozdnaya = 'Zvyozdnaya',
  Sportivnaya = 'Sportivnaya',
}

export type LocationType = keyof typeof Location;
