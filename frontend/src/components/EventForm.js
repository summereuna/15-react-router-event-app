import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
  const navigate = useNavigate();
  function cancelHandler() {
    navigate("..");
  }
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  //백엔드에서 유효성 검사 실패로 액션에서 반환된 response 데이터
  const data = useActionData();

  //이벤트 생성시 method: "POST"
  //이벤트 편집수정시 method: "PATCH"
  return (
    <Form className={classes.form} method={method}>
      {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">제목</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">이미지</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ""}
        />
      </p>
      <p>
        <label htmlFor="date">날짜</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ""}
        />
      </p>
      <p>
        <label htmlFor="description">설명</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          취소
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "제출 중..." : "저장"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

// new라우트와 :id/edit 라우트에서 액션 재사용 하기 위해 여기로 옮김//또는 utility 파일 새로 생성해도 됨
//재사용 가능하게 동적으로 만들어 보자
export const action = async ({ request, params }) => {
  const method = request.method;

  const data = await request.formData();

  const newEventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  let url = `http://localhost:8080/events`;

  if (method === "PATCH") {
    const id = params.id;
    url = `http://localhost:8080/events/${id}`;
  }

  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newEventData),
  });

  //잠재적인 백엔드 검증 오류에 대응하기
  if (response.status === 422) {
    return response;
    //응답 객체 리턴하여 폼 위에 표시
  }

  if (!response.ok) {
    throw json(
      { message: "새로운 이벤트를 저장할 수 없습니다!" },
      { status: 500 }
    );
  }

  return redirect("/events");
};
