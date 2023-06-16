import { Suspense } from "react";
import { Await, defer, json, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  //연기된 데이터
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>로딩 중...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

//이벤트 리스트 가져오는 http 요청
//이벤트 로딩을 연기하기 위해 별도의 함수에 http 요청 작성
const loadEvents = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw json({ message: "이벤트를 가져올 수 없습니다." }, { status: 500 });
  } else {
    //response는 useLoaderData()로 직접 받은 값일 경우에는 작동하지만 defer 단계에 있으면 작동하지 않음
    //따라서 수동으로 파싱해야 함
    const resData = await response.json();
    return resData.events;
  }
};

export const loader = () => {
  return defer({
    events: loadEvents(),
  });
};
