DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS cohorts CASCADE;
DROP TABLE IF EXISTS pairs CASCADE;
DROP TABLE IF EXISTS notes CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS learn CASCADE;

CREATE TABLE students (
name_first TEXT,
name_last TEXT,
learn_avg INT,
project_avg INT,
server_s_ide_test TEXT,
client_s_ide_test TEXT,
soft_skills TEXT,
cohort TEXT,
ETS_date DATE
);

CREATE TABLE cohorts (
cohort TEXT,
begin_date DATE,
end_date DATE,
instructor TEXT,
SEIR1 TEXT,
SEIR2 TEXT
);


CREATE TABLE pairs (
cohort_id INT,
cohort TEXT,
student1_ln TEXT,
student2_ln TEXT
);


CREATE TABLE notes (
student_id INT,
name_first TEXT,
name_last TEXT,
instructor_notes TEXT,
SEIR_notes TEXT,
note_date DATE
);



CREATE TABLE projects (
student_id INT,
name_first TEXT,
name_last TEXT,
cohort TEXT,
project1 INT,
project2 INT,
project3 INT
);

CREATE TABLE learn (
student_id INT,
cohort TEXT,
name_first TEXT,
name_last TEXT,
learn1 INT,
learn2 INT,
learn3 INT
);

INSERT INTO students (name_first, name_last, server_s_ide_test, client_s_ide_test, soft_skills, cohort, ETS_date) 
  VALUES ('John', 'Testor', 'pass', 'pass', '2', 'MCSP13', '12/31/2022');
INSERT INTO cohorts (cohort, begin_date, end_date, instructor, SEIR1, SEIR2) 
  VALUES ('MCSP13', '01/01/2022', '04/04/2022', 'Egg', 'May', 'Growl');
INSERT INTO pairs (cohort, student1_ln, student2_ln) 
  VALUES ('MCSP13', 'Testor', 'Random');
INSERT INTO notes (name_first, name_last, instructor_notes, SEIR_notes, note_date) 
  VALUES ('John', 'Testor', 'Meh', 'Meh','02/02/2022');
INSERT INTO projects (name_first, name_last, cohort, project1, project2, project3) 
  VALUES ('John', 'Testor', 'MCSP13', '99', '88','77');
INSERT INTO learn (name_first, name_last, cohort, learn1, learn2, learn3) 
  VALUES ('John', 'Testor', 'MCSP13', '99', '88','77');


ALTER TABLE students ADD COLUMN student_id SERIAL PRIMARY KEY;
ALTER TABLE cohorts ADD COLUMN cohort_id SERIAL PRIMARY KEY;
ALTER TABLE pairs ADD COLUMN pair_id SERIAL PRIMARY KEY;
ALTER TABLE learn ADD COLUMN learn_avg SERIAL PRIMARY KEY;
ALTER TABLE projects ADD COLUMN project_avg SERIAL PRIMARY KEY;


ALTER TABLE students ADD CONSTRAINT student_learn FOREIGN KEY(learn_avg) REFERENCES learn(learn_avg);
ALTER TABLE students ADD CONSTRAINT student_project FOREIGN KEY(project_avg) REFERENCES projects(project_avg);
ALTER TABLE pairs ADD CONSTRAINT pairs_cohort FOREIGN KEY(cohort_id) REFERENCES cohorts(cohort_id);
ALTER TABLE notes ADD CONSTRAINT notes_student FOREIGN KEY(student_id) REFERENCES students(student_id);
ALTER TABLE projects ADD CONSTRAINT project_student FOREIGN KEY(student_id) REFERENCES students(student_id);
ALTER TABLE learn ADD CONSTRAINT learn_student FOREIGN KEY(student_id) REFERENCES students(student_id);


