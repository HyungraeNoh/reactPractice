import {useParams, useNavigate} from "react-router-dom";
import Header from "../components/Header.jsx";
import Button from "../components/Button.jsx";
import Editor from "../components/Editor.jsx";
import {useContext, useEffect, useState} from "react";
import {DiaryDispatchContext, DiaryStateContext} from "../App.jsx";

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();
  const {onDelete, onUpdate} = useContext(DiaryDispatchContext);
  const data = useContext(DiaryStateContext);
  const [curDiaryItem, setCurDiaryItem] = useState();

  useEffect(() => {
    const currentDiaryItem = data.find(
        (item) => String(item.id) === String(params.id)
    );

    if (!currentDiaryItem) {
      window.alert("존재하지 않는 일기 입니다.");
      nav("/", {replace: true});
    }

    setCurDiaryItem(currentDiaryItem);
  }, [params.id, data]);

  const onClidDelete = () => {
    if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
      // 일기 삭제 로직
      onDelete(params.id);
      nav("/", {replace: true});
    }
  };

  const onSubmit = (input) => {
    if (window.confirm("일기를 정말 수정할까요?")) {
      onUpdate(
          params.id,
          input.createdDate.getTime(),
          input.emotionId,
          input.content
      );
      nav("/", {replace: true});
    }
  };

  return (
      <div>
        <Header
            title={"일기 수정하기"}
            leftChild={
              <Button onClick={() => nav(-1)} text={"< 뒤로가기"}/>
            }
            rightChild={
              <Button onClick={onClidDelete} text={"삭제하기"} type={"NEGATIVE"}/>
            }
        />
        <Editor
            initData={curDiaryItem}
            onSubmit={onSubmit}
        />
      </div>
  );
}

export default Edit;