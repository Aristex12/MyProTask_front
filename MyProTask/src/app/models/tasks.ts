export interface Tasks {
  idTask: number;
  name: string;
  description: string;
  startDate: Date;
  finishDate: Date;
  taskPic: null;
  priority: string;
  project: {
    idProject: number;
    name: string;
    description: string;
    startDate: Date;
    finishDate: Date;
    vacancies: number;
  };
  active: boolean;
}
