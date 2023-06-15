import { json, redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

const EventDetailPage = () => {
  //라우트의 id 프로퍼티를 인자로 받아 로더찾기
  const data = useRouteLoaderData("event-detail");

  return <EventItem event={data.event} />;
};

export default EventDetailPage;

//이벤트 세부정보에 대한 loader 함수
export const loader = async ({ request, params }) => {
  const id = params.id;

  //fetch()로 싱글 이벤트에 관한 데이터 가져와 응답 받기
  const response = await fetch(`http://localhost:8080/events/${id}`);

  if (!response.ok) {
    throw json(
      { message: "선택된 이벤트의 세부 정보를 가져올 수 없습니다." },
      { status: 500 }
    );
  } else {
    return response;
  }
};

//이벤트 삭제 액션
export const action = async ({ request, params }) => {
  const id = params.id;

  const response = await fetch(`http://localhost:8080/events/${id}`, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: "이벤트를 삭제할 수 없습니다!" }, { status: 500 });
  }

  return redirect("/events");
};
