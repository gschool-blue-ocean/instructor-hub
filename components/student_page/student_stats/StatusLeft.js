import style from "../../../styles/StudentStatsLeft.module.css";
import ProjNoteModal from "./ProjNoteModal.js";
import ProjectModal from "./ProjectModal.js";
import AssessModal from "./AssessModal.js";
import React, { useState } from "react";
import {currentlearnAndLearnGradesState, currStudentProjectsState,accessToken, currentStudentState} from "../../state";
import { useRecoilState } from "recoil";

const StatusLeft = () => {
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showProjModal, setShowProjModal] = useState(false)
  const [showAssessModal, setShowAssessModal] = useState(false)
  const [currStudentProjects, setCurrStudentProjects] = useRecoilState(currStudentProjectsState)
  const [currentLearnAndLearnGrades, setCurrentLearnAndLearnGrades] = useRecoilState(currentlearnAndLearnGradesState);
  const [currNote, setCurrNote] = useState(''); 
  const [editProjGrade, setEditPojGrade] = useState(false)
  const [projGradeId, setProjGradeId] = useState(''); 

  console.log(currStudentProjects.length , 'here'); 

  const openNoteModel = (currNote) => {
    setShowNoteModal(true);
    setCurrNote(currNote);
  };
  const projectModal = () => {
    setShowProjModal(true); 
  }
  const assesModal = () => {
    setShowAssessModal(true)
  }

  const editGrade = (projId) => {
    setEditPojGrade(true)
    setProjGradeId()
  }



  return (
    <>
      <ProjNoteModal
        showNotesModal={showNoteModal}
        currNote={currNote}
        onClose={() => {
          setShowNoteModal(false);
        }}
      />
      <ProjectModal 
        showProjModal={showProjModal}
        onClose={() => {
          setShowProjModal(false); 
        }}

      />
      <AssessModal
      showAssessModal={showAssessModal}
      onClose={() => {
        setShowAssessModal(false); 
      }}
       />


      <div className={style.container}>
        <div>
          <div className={style.tableContainer}>
            <div className={style.titleBox}>
              <span className={style.title}>Projects</span>
              <span className={style.add} onClick={projectModal }>&#10133;</span>
            </div>
            {
              currStudentProjects.length ? 
            <table className={style.table}>
              <thead className={style.tableHead}>
                <tr className={style.headerRow}>
                  <th className={`${(style.header, style.headName)}`}>Name</th>
                  <th className={`${(style.header, style.headScore)}`}>
                    Score
                  </th>
                  <th className={`${(style.header, style.headScore)}`}>
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className={`${style.tableBody}, ${style.tbody}`}>
                {currStudentProjects.map((project) => (
                <tr key={project.project_id} className={style.tBodyRow}>
                  <td className={style.projNamCell}>{project.project_name}</td>
                  <td onDoubleClick={() => editGrade(project.project_id)} className={style.scoreCell}>{project.project_passed ? 'Passed' : 'Failed'}</td>
                  <td onClick={() => openNoteModel(project)}  className={style.scoreCell}>
                    {" "}
                    <svg className={style.noteIcon} viewBox="0 0 22 22">
                      {" "}
                      <path
                        d="M13.5,20 C14.3284271,20 15,19.3284271 15,18.5 C15,17.1192881 16.1192881,16 17.5,16 C18.3284271,16 19,15.3284271
                       19,14.5 L19,11.5 C19,11.2238576 19.2238576,11 19.5,11 C19.7761424,11 20,11.2238576 20,11.5 L20,14.5 C20,18.0898509 17.0898509,
                       21 13.5,21 L6.5,21 C5.11928813,21 4,19.8807119 4,18.5 L4,5.5 C4,4.11928813 5.11928813,3 6.5,3 L12.5,3 C12.7761424,3 13,3.22385763
                      13,3.5 C13,3.77614237 12.7761424,4 12.5,4 L6.5,4 C5.67157288,4 5,4.67157288 5,5.5 L5,18.5 C5,19.3284271 5.67157288,20 6.5,20 L13.5,20 
                      L13.5,20 Z M15.7913481,19.5014408 C16.9873685,18.9526013 17.9526013,17.9873685 18.5014408,16.7913481 C18.1948298,16.9255432 17.8561101,17 
                      17.5,17 C16.6715729,17 16,17.6715729 16,18.5 C16,18.8561101 15.9255432,19.1948298 15.7913481,19.5014408 L15.7913481,19.5014408 Z M18,6 
                      L20.5,6 C20.7761424,6 21,6.22385763 21,6.5 C21,6.77614237 20.7761424,7 20.5,7 L18,7 L18,9.5 C18,9.77614237 17.7761424,10 17.5,10 C17.2238576,10 
                      17,9.77614237 17,9.5 L17,7 L14.5,7 C14.2238576,7 14,6.77614237 14,6.5 C14,6.22385763 14.2238576,6 14.5,6 L17,6 L17,3.5 C17,3.22385763 17.2238576,3 
                      17.5,3 C17.7761424,3 18,3.22385763 18,3.5 L18,6 Z M8.5,9 C8.22385763,9 8,8.77614237 8,8.5 C8,8.22385763 8.22385763,8 8.5,8 L12.5,8 C12.7761424,8 
                      13,8.22385763 13,8.5 C13,8.77614237 12.7761424,9 12.5,9 L8.5,9 Z M8.5,12 C8.22385763,12 8,11.7761424 8,11.5 C8,11.2238576 8.22385763,11 8.5,11 L15.5,11 
                      C15.7761424,11 16,11.2238576 16,11.5 C16,11.7761424 15.7761424,12 15.5,12 L8.5,12 Z M8.5,15 C8.22385763,15 8,14.7761424 8,14.5 C8,14.2238576 8.22385763,14 8.5,14 L13.5,14 
                      C13.7761424,14 14,14.2238576 14,14.5 C14,14.7761424 13.7761424,15 13.5,15 L8.5,15 Z"
                      ></path>
                    </svg>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
            :
            <>
            <div className={style.noValueContainer}>
              <div>
                <div>NO CURRENT PROJECT</div> 
              </div>
            </div>
            </>
            }
          </div>
          <div className={style.tableContainer}>
            <div className={style.titleBox}>
              <span className={style.title}>Assesments</span>
              <span className={style.add} onClick={assesModal} >&#10133;</span>
            </div>
            <div>
              {
                currentLearnAndLearnGrades.length ?
              <table className={style.table}>
                <thead className={style.tableHead}>
                  <tr className={style.headerRow}>
                    <th className={`${(style.header, style.headName)}`}>
                      Name
                    </th>
                    <th className={`${(style.header, style.headScore)}`}>
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody className={`${style.tableBody}, ${style.tbody}`}>
                  {currentLearnAndLearnGrades.map((assessment) =>(
                    <tr key={assessment.assessment_id}className={style.tBodyRow}>
                    <td className={style.projNamCell}>{assessment.assessment_name}</td>
                    <td className={style.scoreCell}>{`${assessment.assessment_grade} %`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              : 
            <>
            <div className={style.noValueContainer}>
              <div>
                <div> NO CURRENT ASSESSMENTS </div>
              </div>
            </div>
            </>

              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatusLeft;
