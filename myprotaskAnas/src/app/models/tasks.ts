export interface Tasks {
    name:string,
    description:string,
    startDate: Date,
    finishDate: Date,
    taskPic: null,
    priority: string,
    project: {
        name:string,
        active:boolean
    },
    active:boolean
}