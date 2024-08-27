import {Routes, Route, Link, useNavigate} from 'react-router-dom';
import {useReducer, useRef} from "react";
import './App.css'
import Home from "./pages/Home.jsx";
import New from "./pages/New.jsx";
import Diary from "./pages/Diary.jsx";
import NotFound from "./pages/NotFound.jsx"
import Edit from "./pages/Edit.jsx";

import Button from "./components/Button.jsx";
import Header from "./components/Header.jsx";

import {getEmotionImage} from "./util/get-emotion-image.js";

const mockData = [
  {
    id: 1,
    createDate: new Date().getTime(),
    emotionId: 1,
    content: "1번 일기 내용"
  },
  {
    id: 2,
    createDate: new Date().getTime(),
    emotionId: 2,
    content: "2번 일기 내용"
  }
]

function reducer(state, action) {
  switch (action.type) {
    case "CREATE" :
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) => {})
  }
}

// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지
function App() {

  // const nav = useNavigate();
  // const onClickButton = () =>{
  //   nav("/new");
  // };

  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  // 새로운 일기 추가
  const onCreate = (createDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createDate,
        emotionId,
        content
      }
    });
  };

  const onUpdate = (id, createDate, emotionId, content) =>{
    dispatch({
      type : "UPDATE",
      data :{
        id,
        createDate,
        emotionId,
        content
      }
    })
  };

  // 기존 일기 수정

  // 기존 일기 삭제

  return (
      <>
        <button onClick={() => {
          onCreate(new Date().getTime(), 1, "HELLO");
        }}>
          일기 추가
        </button>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/new" element={<New/>}/>
          <Route path="/diary/:id" element={<Diary/>}/>
          <Route path="*" element={<NotFound/>}/>
          <Route path="/edit/:id" element={<Edit/>}/>
        </Routes>
      </>
  )
}

// return(
//     <Header
//         title={"Header"}
//         leftChild={<Button text={"Left"}/> }
//         rightChild={<Button text={"Right"}/>}
//     />
// <Button
//     type={"DEFAULT"}
//     text={123}
//     onClick={() => {
//       console.log("123번 버튼클릭")
//     }}/>
//
// <Button
//     type={"POSITIVE"}
//     text={123}
//     onClick={() => {
//       console.log("123번 버튼클릭")
//     }}/>
//
// <Button
//     type={"NEGATIVE"}
//     text={123}
//     onClick={() => {
//       console.log("123번 버튼클릭")
//     }}/>
// )

export default App
