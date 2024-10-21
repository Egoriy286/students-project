export interface Student{
    id: number;
    name: string;
    present: boolean;
};
export interface Lecture{
    id: number;
    name: string;
};
export interface Attendance{
    date : string;
    lecture_id: number;
    students: Array<Student>;
}
export interface GroupedAttendance {
    lecture: { name: string; };
    date: string;
    presents: number;
    students: Student[];
  }