export interface Project {
  idProject: number;
  name: string;
  description: string;
  startDate: Date;
  finishDate: Date;
  vacancies: number;
  active: string;
  projectCharacteristics: [
    {
      idCharacteristic: number;
      name: string;
      category: [
        {
          idCategory: number;
          name: string;
          technical: boolean;
        }
      ];
    }
  ];
}
