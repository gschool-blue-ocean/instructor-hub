import { useState } from "react";
import { useRecoilState } from "recoil";
import { nanoid } from "nanoid";
import { studentsState, currentCohortState, cohortsState, studentIdState } from "../../state.js";
import gitStyle from "../../../styles/GitHub.module.css";
import Image from "next/image";
import axios from "axios";

const GitHubModal = ({ showGitHubModal, setShowGitHubModal, onClose }) => {
  const [students, setStudents] = useRecoilState(studentsState);
  const [isEditing, setIsEditing] = useState(false);
  const [githubAccount, setGithubAccount] = useState(null);
  const [studentId, setStudentId] = useRecoilState(studentIdState);
  const [currentValue, setCurrentValue] = useState({ github: "" });
  const [updatedGithub, setUpdatedGithub] = useState("");
  console.log(currentValue)
  // edit github accounts
  const patchGithub = (e) => {
    
    let githubId = Number(githubAccount)
  
        axios.patch(`/api/students/${githubId}`, {
          "github": `${currentValue}`
        })
          .then((res) => {
            setStudents([...students])
            setUpdatedGithub(res.data)
            setIsEditing(false);
           
            const indexOfStudents = students.findIndex((student) => student.student_id === res.data.student_id);
            const updateStudents = [...students];
            updateStudents[indexOfStudents] = res.data;
            setStudents(updateStudents);  
          });
    }
  
// gets student id and makes account editable
  const editGithub = (e) => {
    setGithubAccount(e.target.id)
    setIsEditing(true);
    setCurrentValue(e.target.textContent)
  }

  return (
    <>
      {showGitHubModal ? (
        <div>
          <div className={gitStyle.background} onClick={onClose}></div>
          <div className={gitStyle.gitContainer}>
            <div className={gitStyle.top_bar}></div>
            <div>
              <div className={gitStyle.listHeader}>
                <div>
                  <div className={gitStyle.headerInfo}>
                    <div className={gitStyle.info}>
                      <svg className={gitStyle.personIcon}>
                        <path
                          fillRule="evenodd"
                          d="M10.5 5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm.061 3.073a4 4 0 10-5.123 0 6.004 6.004 0 00-3.431 5.142.75.75 0 001.498.07 4.5 4.5 0 018.99 0 .75.75 0 101.498-.07 6.005 6.005 0 00-3.432-5.142z"
                        ></path>
                      </svg>
                      {` ${students.length} Members`}
                    </div>
                  </div>
                  <div onClick={onClose} className={gitStyle.close}></div>
                </div>
              </div>
              <ul className={gitStyle.tableList}>
                {students.map((student) => (
                  <li className={gitStyle.tableListItem} key="student_key">
                    <div className={gitStyle.tableListCell}>
                      <span className={gitStyle.frameLeft}>
                        <a className={gitStyle.frameInline} href="#">
                          <Image
                            src="/pic1.jpg"
                            height="44"
                            width="44"
                            className={gitStyle.avatar}
                          />
                        </a>
                      </span>
                    </div>
                    <div className={gitStyle.tableListName}>
                      <a className={gitStyle.frameInclineName}>
                       {student.name}
                      </a>
                      {isEditing && student.student_id == githubAccount ? 
                          <>
                          <input type="text" defaultValue={student.github} onChange={(e) => setCurrentValue(e.target.value) } />
                           <button onClick={(e) => patchGithub(e)}>&#10004;</button>
                           <button onClick={() => setIsEditing(false)}>X</button>
                          </> 
                        :
                          <span className={gitStyle.codeName} id={student.student_id}
                          onDoubleClick={(e) => editGithub(e)}>
                           {(student.github ? student.github : "Add Github")}
                          </span>
                      }                 
                    </div>
                  </li>
                    ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default GitHubModal;
