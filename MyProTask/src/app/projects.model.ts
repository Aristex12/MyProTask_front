export class Project {
    constructor(
      public id_project: number,
      public name: string,
      public description: string,
      public startDate: Date,
      public finishDate: Date,
      public vacancies: number,
      public status: string,
      //public manager_id: number
    ) {}
  }
  