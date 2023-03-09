export interface Pet {
  id: number;
  animalName: string;
  species: string;
  breed: string;
  height: number;
  weight: number;
  fur: Fur;
  treatment: Treatment;
  statusAnimal: StatusAnimal;
  responsibleName: string;
  responsiblePhone: string;
  responsibleEmail: string
}

enum Fur {
  CURTO,
  LONGO,
  DUPLA
}

enum Treatment {
  HIDRATAÇÃO,
  PENTEAR,
  MANICURE,
  TOSA,
  PINTURA,
  BANHO
}

enum StatusAnimal {
  PENDING,
  FINISHED
}
