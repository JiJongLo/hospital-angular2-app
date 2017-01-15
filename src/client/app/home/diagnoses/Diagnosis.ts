export class Diagnosis {
    info:string;
    code:string;
    removed:boolean;
    addedDate:string;
    patientId : number;
    removedDate:string;
    constructor(info:string, code:string, removed:boolean, patientId: number, addedDate:string, removedDate?:string, ) {
        this.info = info;
        this.code = code;
        this.addedDate = addedDate;
        this.patientId = patientId;
        this.removed = removed;
        this.removedDate = removedDate;
    }
}
