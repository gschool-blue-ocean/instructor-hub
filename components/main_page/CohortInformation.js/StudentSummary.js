import studentStyle from "../../../styles/StudentSummary.module.css";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import data, { studentsState } from "../../state.js";
import GitHubModal from "./GitHubModal";
import CommentModal from "./CommentModal";

const StudentSummary = () => {
  const [students, setStudents] = useRecoilState(studentsState);
  const [showGitHubModal, setShowGitHubModal] = useState(false);
  const [showCommentModal, setShowCommenttModal] = useState(false);
  const [checkedAll, setCheckAll] = useState(false);
  // const [checked, setChecked] = useState({ students: false });

  const openGitHubModal = () => {
    setShowGitHubModal((prev) => !prev);
  };

  const openCommentModel = () => {
    setShowCommenttModal((prev) => !prev);
  };

  useEffect(() => {
    setStudents(students)
  }, []);

  const handleChange = (e) => {
    const { id, checked } = e.target;
    if (id === "allSelect") {
      let tempStudent = students.map((student) => {
        return { ...student, isChecked: checked };
      });
      setStudents(tempStudent);
    } else {
      let tempStudent = students.map((student) => 
        student.id === id ? { ...student, isChecked: checked } : student 
    );
      setStudents(tempStudent);
    }
  }


  // onChange={() => toggleCheck("{student.student_id}")} checked={checked["{student.student_id}"]}
  // const toggleCheck = (inputName) => {
  //   setChecked((prevState) => {
  //     const newState = { ...prevState };
  //     newState[inputName] = !prevState[inputName];
  //     return newState;
  //   });
  // };

  // const selectAll = (value) => {
  //   setCheckAll(value);
  //   setChecked((prevState) => {
  //     const newState = { ...prevState };
  //     for (const inputName in newState) {
  //       newState[inputName] = value;
  //     }
  //     return newState;
  //   });
  // };

  // useEffect(() => {
  //   let allChecked = true;
  //   for (const inputName in checked) {
  //     if (checked[inputName] === false) {
  //       allChecked = false;
  //     }
  //   }
  //   if (allChecked) {
  //     setCheckAll(true);
  //   } else {
  //     setCheckAll(false);
  //   }
  // }, [checked]);

  return (

    <div>
      <GitHubModal showGitHubModal={showGitHubModal} setShowGitHubModal={setShowGitHubModal} onClose={() => {setShowGitHubModal(false)}}/>
      <CommentModal showCommentModal={showCommentModal} setShowCommenttModal={setShowGitHubModal} onClose={() => {setShowCommenttModal(false)}}/>
      <div className= {studentStyle.container}>
        <div className={studentStyle.topBorder}>
          <div className={studentStyle.selectRow}>
            <div className={studentStyle.selectAllBox}>
              <input
                // onChange={(event) => selectAll(event.target.checked)}
                // checked={checkedAll}
                className={studentStyle.checkBox}
                type="checkbox"
                name="allSelect"
                checked={!students.some((student) => student?.isChecked !== true)}
                onChange={handleChange}
              />
              <label htmlFor="selectMe"> Select/Deselect All</label>
            </div>
            <div className={studentStyle.addGit}>
              <a className={studentStyle.gitBtn}>
                <span
                  onClick={openGitHubModal}
                  className={` ${studentStyle.gitBtn_medium} ${studentStyle.span}`}
                >
                  Github Accounts
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className={studentStyle.middleBorder}>
          <div>
            <table className={studentStyle.table}>
              <thead className={studentStyle.thead}>
                <tr className={studentStyle.headerRow}>
                  <th></th>
                  <th className={studentStyle.header} scope="col">
                    Name
                    {/* <img src="https://store.akamai.steamstatic.com/public/shared/images/popups/btn_arrow_down_padded.png"/> */}
                  </th>
                  <th className={studentStyle.header} scope="col">
                    Assessment Average
                    {/* <img src="https://store.akamai.steamstatic.com/public/shared/images/popups/btn_arrow_down_padded.png"/> */}
                  </th>
                  <th className={studentStyle.header} scope="col">
                    Technical Skills
                    {/* <img src="https://store.akamai.steamstatic.com/public/shared/images/popups/btn_arrow_down_padded.png"/> */}
                  </th>
                  <th className={studentStyle.header} scope="col">
                    Comments
                    {/* <img src="https://store.akamai.steamstatic.com/public/shared/images/popups/btn_arrow_down_padded.png"/> */}
                  </th>
                  <th className={studentStyle.header} scope="col"></th>
                </tr>
              </thead>
              <tbody className= {`${studentStyle.tbody} ${studentStyle.tableBody}`}>
              {students.map((student) => (
                <tr key={student.student_id} className={studentStyle.tbodyRow}>
                  <td>
                    <input type="checkbox" name={student.id} checked={student?.isChecked || false} onChange={handleChange}></input>
                  </td>
                  <td className={studentStyle.content}>
                    <a href="#">{student.name_first +" "+student.name_last}</a>
                  </td>
                  <td className={studentStyle.content}>{student.learn_avg}%</td>
                  <td className={studentStyle.content}>
                    <div className={studentStyle.color3}>At Risk</div>
                  </td>
                  <td
                    onClick={openCommentModel}
                    className={studentStyle.content}
                  >
                    {" "}
                    <svg className={studentStyle.noteIcon} viewBox="0 0 22 22">
                      {" "}
                      <path d="M13.5,20 C14.3284271,20 15,19.3284271 15,18.5 C15,17.1192881 16.1192881,16 17.5,16 C18.3284271,16 19,15.3284271
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
                      C13.7761424,14 14,14.2238576 14,14.5 C14,14.7761424 13.7761424,15 13.5,15 L8.5,15 Z"></path>
                    </svg>
                  </td>
                  <td>
                    <svg className={studentStyle.dot}>
                      {" "}
                      <path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>{" "}
                    </svg>{" "}
                  </td>
                </tr>
                ))}
                {/* <tr className={studentStyle.tbodyRow}>
                  <td>
                    <input
                      type="checkbox"
                      name="name"
                      // onChange={() => toggleCheck("row2")}
                      // checked={checked["row2"]}
                    ></input>
                  </td>
                  <td className={studentStyle.content}>
                    <a href="#">Student 2</a>
                  </td>
                  <td className={studentStyle.content}>70/100</td>
                  <td className={studentStyle.content}>
                    <div className={studentStyle.color2}>On Track</div>
                  </td>
                  <td
                    onClick={openCommentModel}
                    className={studentStyle.content}
                  >
                    {" "}
                    <svg className={studentStyle.noteIcon} viewBox="0 0 22 22">
                      {" "}
                      <path d="M13.5,20 C14.3284271,20 15,19.3284271 15,18.5 C15,17.1192881 16.1192881,16 17.5,16 C18.3284271,16 19,15.3284271 19,14.5 L19,11.5 C19,11.2238576 19.2238576,11 19.5,11 C19.7761424,11 20,11.2238576 20,11.5 L20,14.5 C20,18.0898509 17.0898509,21 13.5,21 L6.5,21 C5.11928813,21 4,19.8807119 4,18.5 L4,5.5 C4,4.11928813 5.11928813,3 6.5,3 L12.5,3 C12.7761424,3 13,3.22385763 13,3.5 C13,3.77614237 12.7761424,4 12.5,4 L6.5,4 C5.67157288,4 5,4.67157288 5,5.5 L5,18.5 C5,19.3284271 5.67157288,20 6.5,20 L13.5,20 L13.5,20 Z M15.7913481,19.5014408 C16.9873685,18.9526013 17.9526013,17.9873685 18.5014408,16.7913481 C18.1948298,16.9255432 17.8561101,17 17.5,17 C16.6715729,17 16,17.6715729 16,18.5 C16,18.8561101 15.9255432,19.1948298 15.7913481,19.5014408 L15.7913481,19.5014408 Z M18,6 L20.5,6 C20.7761424,6 21,6.22385763 21,6.5 C21,6.77614237 20.7761424,7 20.5,7 L18,7 L18,9.5 C18,9.77614237 17.7761424,10 17.5,10 C17.2238576,10 17,9.77614237 17,9.5 L17,7 L14.5,7 C14.2238576,7 14,6.77614237 14,6.5 C14,6.22385763 14.2238576,6 14.5,6 L17,6 L17,3.5 C17,3.22385763 17.2238576,3 17.5,3 C17.7761424,3 18,3.22385763 18,3.5 L18,6 Z M8.5,9 C8.22385763,9 8,8.77614237 8,8.5 C8,8.22385763 8.22385763,8 8.5,8 L12.5,8 C12.7761424,8 13,8.22385763 13,8.5 C13,8.77614237 12.7761424,9 12.5,9 L8.5,9 Z M8.5,12 C8.22385763,12 8,11.7761424 8,11.5 C8,11.2238576 8.22385763,11 8.5,11 L15.5,11 C15.7761424,11 16,11.2238576 16,11.5 C16,11.7761424 15.7761424,12 15.5,12 L8.5,12 Z M8.5,15 C8.22385763,15 8,14.7761424 8,14.5 C8,14.2238576 8.22385763,14 8.5,14 L13.5,14 C13.7761424,14 14,14.2238576 14,14.5 C14,14.7761424 13.7761424,15 13.5,15 L8.5,15 Z"></path>
                    </svg>
                  </td>
                  <td>
                    <svg className={studentStyle.dot}>
                      {" "}
                      <path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
                    </svg>{" "}
                  </td>
                </tr>

                <tr className={studentStyle.tbodyRow}>
                  <td>
                    <input
                      type="checkbox"
                      name="name"
                      // onChange={() => toggleCheck("row3")}
                      // checked={checked["row3"]}
                    ></input>
                  </td>
                  <td className={studentStyle.content}>
                    <a href="#">Student 3</a>
                  </td>
                  <td className={studentStyle.content}>95/100</td>
                  <td className={studentStyle.content}>
                    <div className={studentStyle.color2}>On Track</div>
                  </td>
                  <td className={studentStyle.content}>
                    {" "}
                    <svg className={studentStyle.noteIcon} viewBox="0 0 22 22">
                      {" "}
                      <path d="M13.5,20 C14.3284271,20 15,19.3284271 15,18.5 C15,17.1192881 16.1192881,16 17.5,16 C18.3284271,16 19,15.3284271 19,14.5 L19,11.5 C19,11.2238576 19.2238576,11 19.5,11 C19.7761424,11 20,11.2238576 20,11.5 L20,14.5 C20,18.0898509 17.0898509,21 13.5,21 L6.5,21 C5.11928813,21 4,19.8807119 4,18.5 L4,5.5 C4,4.11928813 5.11928813,3 6.5,3 L12.5,3 C12.7761424,3 13,3.22385763 13,3.5 C13,3.77614237 12.7761424,4 12.5,4 L6.5,4 C5.67157288,4 5,4.67157288 5,5.5 L5,18.5 C5,19.3284271 5.67157288,20 6.5,20 L13.5,20 L13.5,20 Z M15.7913481,19.5014408 C16.9873685,18.9526013 17.9526013,17.9873685 18.5014408,16.7913481 C18.1948298,16.9255432 17.8561101,17 17.5,17 C16.6715729,17 16,17.6715729 16,18.5 C16,18.8561101 15.9255432,19.1948298 15.7913481,19.5014408 L15.7913481,19.5014408 Z M18,6 L20.5,6 C20.7761424,6 21,6.22385763 21,6.5 C21,6.77614237 20.7761424,7 20.5,7 L18,7 L18,9.5 C18,9.77614237 17.7761424,10 17.5,10 C17.2238576,10 17,9.77614237 17,9.5 L17,7 L14.5,7 C14.2238576,7 14,6.77614237 14,6.5 C14,6.22385763 14.2238576,6 14.5,6 L17,6 L17,3.5 C17,3.22385763 17.2238576,3 17.5,3 C17.7761424,3 18,3.22385763 18,3.5 L18,6 Z M8.5,9 C8.22385763,9 8,8.77614237 8,8.5 C8,8.22385763 8.22385763,8 8.5,8 L12.5,8 C12.7761424,8 13,8.22385763 13,8.5 C13,8.77614237 12.7761424,9 12.5,9 L8.5,9 Z M8.5,12 C8.22385763,12 8,11.7761424 8,11.5 C8,11.2238576 8.22385763,11 8.5,11 L15.5,11 C15.7761424,11 16,11.2238576 16,11.5 C16,11.7761424 15.7761424,12 15.5,12 L8.5,12 Z M8.5,15 C8.22385763,15 8,14.7761424 8,14.5 C8,14.2238576 8.22385763,14 8.5,14 L13.5,14 C13.7761424,14 14,14.2238576 14,14.5 C14,14.7761424 13.7761424,15 13.5,15 L8.5,15 Z"></path>
                    </svg>
                  </td>
                  <td>
                    <svg className={studentStyle.dot}>
                      {" "}
                      <path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>{" "}
                    </svg>{" "}
                  </td>
                </tr> */}

                {/* <tr className={studentStyle.tbodyRow}>
                  <td>
                    <input
                      type="checkbox"
                      name="name"
                      onChange={() => toggleCheck("row4")}
                      checked={checked["row4"]}
                    ></input>
                  </td>
                  <td className={studentStyle.content}>
                    <a href= "#">Student 4</a>
                  </td>
                  <td className={studentStyle.content}>95/100</td>
                  <td className={studentStyle.content}>
                    <div className={studentStyle.color3}>At Risk</div>
                  </td>
                  <td className={studentStyle.content}>
                    {" "}
                    <svg className={studentStyle.noteIcon} viewBox="0 0 22 22">
                      {" "}
                      <path d="M13.5,20 C14.3284271,20 15,19.3284271 15,18.5 C15,17.1192881 16.1192881,16 17.5,16 C18.3284271,16 19,15.3284271 19,14.5 L19,11.5 C19,11.2238576 19.2238576,11 19.5,11 C19.7761424,11 20,11.2238576 20,11.5 L20,14.5 C20,18.0898509 17.0898509,21 13.5,21 L6.5,21 C5.11928813,21 4,19.8807119 4,18.5 L4,5.5 C4,4.11928813 5.11928813,3 6.5,3 L12.5,3 C12.7761424,3 13,3.22385763 13,3.5 C13,3.77614237 12.7761424,4 12.5,4 L6.5,4 C5.67157288,4 5,4.67157288 5,5.5 L5,18.5 C5,19.3284271 5.67157288,20 6.5,20 L13.5,20 L13.5,20 Z M15.7913481,19.5014408 C16.9873685,18.9526013 17.9526013,17.9873685 18.5014408,16.7913481 C18.1948298,16.9255432 17.8561101,17 17.5,17 C16.6715729,17 16,17.6715729 16,18.5 C16,18.8561101 15.9255432,19.1948298 15.7913481,19.5014408 L15.7913481,19.5014408 Z M18,6 L20.5,6 C20.7761424,6 21,6.22385763 21,6.5 C21,6.77614237 20.7761424,7 20.5,7 L18,7 L18,9.5 C18,9.77614237 17.7761424,10 17.5,10 C17.2238576,10 17,9.77614237 17,9.5 L17,7 L14.5,7 C14.2238576,7 14,6.77614237 14,6.5 C14,6.22385763 14.2238576,6 14.5,6 L17,6 L17,3.5 C17,3.22385763 17.2238576,3 17.5,3 C17.7761424,3 18,3.22385763 18,3.5 L18,6 Z M8.5,9 C8.22385763,9 8,8.77614237 8,8.5 C8,8.22385763 8.22385763,8 8.5,8 L12.5,8 C12.7761424,8 13,8.22385763 13,8.5 C13,8.77614237 12.7761424,9 12.5,9 L8.5,9 Z M8.5,12 C8.22385763,12 8,11.7761424 8,11.5 C8,11.2238576 8.22385763,11 8.5,11 L15.5,11 C15.7761424,11 16,11.2238576 16,11.5 C16,11.7761424 15.7761424,12 15.5,12 L8.5,12 Z M8.5,15 C8.22385763,15 8,14.7761424 8,14.5 C8,14.2238576 8.22385763,14 8.5,14 L13.5,14 C13.7761424,14 14,14.2238576 14,14.5 C14,14.7761424 13.7761424,15 13.5,15 L8.5,15 Z"></path>
                    </svg>
                  </td>
                  <td>
                    <svg className={studentStyle.dot}>
                      {" "}
                      <path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>{" "}
                    </svg>{" "}
                  </td>
                </tr>

                <tr className={studentStyle.tbodyRow}>
                  <td>
                    <input
                      type="checkbox"
                      name="name"
                      onChange={() => toggleCheck("row5")}
                      checked={checked["row5"]}
                    ></input>
                  </td>
                  <td className={studentStyle.content}>
                    <a href= "#">Student5</a>
                  </td>
                  <td className={studentStyle.content}>95/100</td>
                  <td className={studentStyle.content}>
                    <div className={studentStyle.color}>Behind</div>
                  </td>
                  <td className={studentStyle.content}>
                    {" "}
                    <svg className={studentStyle.noteIcon} viewBox="0 0 22 22">
                      {" "}
                      <path d="M13.5,20 C14.3284271,20 15,19.3284271 15,18.5 C15,17.1192881 16.1192881,16 17.5,16 C18.3284271,16 19,15.3284271 19,14.5 L19,11.5 C19,11.2238576 19.2238576,11 19.5,11 C19.7761424,11 20,11.2238576 20,11.5 L20,14.5 C20,18.0898509 17.0898509,21 13.5,21 L6.5,21 C5.11928813,21 4,19.8807119 4,18.5 L4,5.5 C4,4.11928813 5.11928813,3 6.5,3 L12.5,3 C12.7761424,3 13,3.22385763 13,3.5 C13,3.77614237 12.7761424,4 12.5,4 L6.5,4 C5.67157288,4 5,4.67157288 5,5.5 L5,18.5 C5,19.3284271 5.67157288,20 6.5,20 L13.5,20 L13.5,20 Z M15.7913481,19.5014408 C16.9873685,18.9526013 17.9526013,17.9873685 18.5014408,16.7913481 C18.1948298,16.9255432 17.8561101,17 17.5,17 C16.6715729,17 16,17.6715729 16,18.5 C16,18.8561101 15.9255432,19.1948298 15.7913481,19.5014408 L15.7913481,19.5014408 Z M18,6 L20.5,6 C20.7761424,6 21,6.22385763 21,6.5 C21,6.77614237 20.7761424,7 20.5,7 L18,7 L18,9.5 C18,9.77614237 17.7761424,10 17.5,10 C17.2238576,10 17,9.77614237 17,9.5 L17,7 L14.5,7 C14.2238576,7 14,6.77614237 14,6.5 C14,6.22385763 14.2238576,6 14.5,6 L17,6 L17,3.5 C17,3.22385763 17.2238576,3 17.5,3 C17.7761424,3 18,3.22385763 18,3.5 L18,6 Z M8.5,9 C8.22385763,9 8,8.77614237 8,8.5 C8,8.22385763 8.22385763,8 8.5,8 L12.5,8 C12.7761424,8 13,8.22385763 13,8.5 C13,8.77614237 12.7761424,9 12.5,9 L8.5,9 Z M8.5,12 C8.22385763,12 8,11.7761424 8,11.5 C8,11.2238576 8.22385763,11 8.5,11 L15.5,11 C15.7761424,11 16,11.2238576 16,11.5 C16,11.7761424 15.7761424,12 15.5,12 L8.5,12 Z M8.5,15 C8.22385763,15 8,14.7761424 8,14.5 C8,14.2238576 8.22385763,14 8.5,14 L13.5,14 C13.7761424,14 14,14.2238576 14,14.5 C14,14.7761424 13.7761424,15 13.5,15 L8.5,15 Z"></path>
                    </svg>
                  </td>
                  <td>
                    <svg className={studentStyle.dot}>
                      {" "}
                      <path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>{" "}
                    </svg>{" "}
                  </td>
                </tr>

                <tr className={studentStyle.tbodyRow}>
                  <td>
                    <input
                      type="checkbox"
                      name="name"
                      onChange={() => toggleCheck("row6")}
                      checked={checked["row6"]}
                    ></input>
                  </td>
                  <td className={studentStyle.content}>
                    <a href="#">student6</a>
                  </td>
                  <td className={studentStyle.content}>95/100</td>
                  <td className={studentStyle.content}>
                    <div className={studentStyle.color2}>On Track</div>
                  </td>
                  <td className={studentStyle.content}>
                    {" "}
                    <svg className={studentStyle.noteIcon} viewBox="0 0 22 22">
                      {" "}
                      <path d="M13.5,20 C14.3284271,20 15,19.3284271 15,18.5 C15,17.1192881 16.1192881,16 17.5,16 C18.3284271,16 19,15.3284271 19,14.5 L19,11.5 C19,11.2238576 19.2238576,11 19.5,11 C19.7761424,11 20,11.2238576 20,11.5 L20,14.5 C20,18.0898509 17.0898509,21 13.5,21 L6.5,21 C5.11928813,21 4,19.8807119 4,18.5 L4,5.5 C4,4.11928813 5.11928813,3 6.5,3 L12.5,3 C12.7761424,3 13,3.22385763 13,3.5 C13,3.77614237 12.7761424,4 12.5,4 L6.5,4 C5.67157288,4 5,4.67157288 5,5.5 L5,18.5 C5,19.3284271 5.67157288,20 6.5,20 L13.5,20 L13.5,20 Z M15.7913481,19.5014408 C16.9873685,18.9526013 17.9526013,17.9873685 18.5014408,16.7913481 C18.1948298,16.9255432 17.8561101,17 17.5,17 C16.6715729,17 16,17.6715729 16,18.5 C16,18.8561101 15.9255432,19.1948298 15.7913481,19.5014408 L15.7913481,19.5014408 Z M18,6 L20.5,6 C20.7761424,6 21,6.22385763 21,6.5 C21,6.77614237 20.7761424,7 20.5,7 L18,7 L18,9.5 C18,9.77614237 17.7761424,10 17.5,10 C17.2238576,10 17,9.77614237 17,9.5 L17,7 L14.5,7 C14.2238576,7 14,6.77614237 14,6.5 C14,6.22385763 14.2238576,6 14.5,6 L17,6 L17,3.5 C17,3.22385763 17.2238576,3 17.5,3 C17.7761424,3 18,3.22385763 18,3.5 L18,6 Z M8.5,9 C8.22385763,9 8,8.77614237 8,8.5 C8,8.22385763 8.22385763,8 8.5,8 L12.5,8 C12.7761424,8 13,8.22385763 13,8.5 C13,8.77614237 12.7761424,9 12.5,9 L8.5,9 Z M8.5,12 C8.22385763,12 8,11.7761424 8,11.5 C8,11.2238576 8.22385763,11 8.5,11 L15.5,11 C15.7761424,11 16,11.2238576 16,11.5 C16,11.7761424 15.7761424,12 15.5,12 L8.5,12 Z M8.5,15 C8.22385763,15 8,14.7761424 8,14.5 C8,14.2238576 8.22385763,14 8.5,14 L13.5,14 C13.7761424,14 14,14.2238576 14,14.5 C14,14.7761424 13.7761424,15 13.5,15 L8.5,15 Z"></path>
                    </svg>
                  </td>
                  <td>
                    <svg className={studentStyle.dot}>
                      {" "}
                      <path d="M8 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM1.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm13 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>{" "}
                    </svg>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSummary;
