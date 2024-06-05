export interface Requests {
  idRequest: number;
  message: string;
  project: {
    idProject: number;
    name: string;
  };
  user: {
    idUser: number;
    email: string;
  };
}
