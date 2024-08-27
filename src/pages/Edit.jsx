import {useParams} from "react-router-dom";

const Edit = ()=> {
  const params = useParams();
  return (
      <div>
        {params.id}번 화면입니다.
      </div>
  );
}

export default Edit;