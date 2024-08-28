import {Routes, Route, Link, useNavigate} from 'react-router-dom';
import {useReducer, useRef, createContext, useEffect, useState} from "react";
import './App.css'
import Home from "./pages/Home.jsx";
import New from "./pages/New.jsx";
import Diary from "./pages/Diary.jsx";
import NotFound from "./pages/NotFound.jsx"
import Edit from "./pages/Edit.jsx";

// const mockData = [
//   {
//     id: 1,
//     createdDate: new Date("2024-08-28").getTime(),
//     emotionId: 1,
//     content: "1번 일기 내용"
//   },
//   {
//     id: 2,
//     createdDate: new Date("2024-08-27").getTime(),
//     emotionId: 2,
//     content: "2번 일기 내용"
//   },
//   {
//     id: 3,
//     createdDate: new Date("2024-07-07").getTime(),
//     emotionId: 3,
//     content: "3번 일기 내용"
//   },
// ];

function reducer(state, action) {
  let nextSate;

  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE" : {
      nextSate = [action.data, ...state];
      break;
    }
      ;
    case "UPDATE": {
      nextSate = state.map(
          (item) => String(item.id) === String(action.data.id) ? action.data
              : item
      );
      break;
    }
    case "DELETE": {
      nextSate = state.filter((item) => String(item.id) !== String(action.id));
      break;
    }
    default :
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(nextSate));
  return nextSate;
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2. "/new" : 새로운 일기를 작성하는 New 페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(() => {
    const storedData = localStorage.getItem("diary");
    if (!storedData) {
      setIsLoading(false);
      return;
    }
    const parsedData = JSON.parse(storedData);
    if(!Array.isArray(parsedData)){
      setIsLoading(false);
      return;
    }

    let maxId = 0;
    parsedData.forEach((item)=>{
      if(Number(item.id) > maxId){
        maxId = Number(item.id);
      }
    });

    idRef.current = maxId + 1;

    dispatch({
      type: "INIT",
      data: parsedData
    });
    setIsLoading(false);
  }, []);

  // 새로운 일기 추가
  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content
      }
    });
  };

  // 기존 일기 수정
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content
      }
    })
  };

  // 기존 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    })
  };

  if(isLoading){
    return <div>데이터 로딩중입니다...</div>;
  }

  return (
      <>
        <DiaryStateContext.Provider value={data}>
          <DiaryDispatchContext.Provider
              value={{
                onCreate,
                onUpdate,
                onDelete
              }}
          >
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/new" element={<New/>}/>
              <Route path="/diary/:id" element={<Diary/>}/>
              <Route path="/edit/:id" element={<Edit/>}/>
              <Route path="*" element={<NotFound/>}/>
            </Routes>
          </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
      </>
  );
}

export default App
