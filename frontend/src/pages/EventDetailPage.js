import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

const EventDetailPage = () => {
  const { event, events } = useRouteLoaderData("event-detail");
  console.log(events);
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>로딩중...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>로딩중...</p>}>
        <Await resolve={events}>
          {(loadedEventsList) => <EventsList events={loadedEventsList} />}
        </Await>
      </Suspense>
    </>
  );
};

export default EventDetailPage;

// id에 따른 싱글 이벤트 가져오는 http 요청
const loadEvent = async (id) => {
  const response = await fetch(`http://localhost:8080/events/${id}`);

  if (!response.ok) {
    throw json(
      { message: "선택된 이벤트의 세부 정보를 가져올 수 없습니다." },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
};

// 모든 이벤트 리스트 가져오는 http 요청
const loadEventsList = async () => {
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

// 싱글 이벤트, 이벤트 리스트 defer()로 가져오는 loader 함수
export const loader = async ({ request, params }) => {
  const id = params.id;

  //데이터 연기: 세부 조정 가능
  //async 함수가 있는 async 로더가 있으면 await 키워드를 넣어서 그 데이터 로딩될 때 까지 기다렸다가 페이지 컴포넌트 로딩되게 함
  return defer({
    //페이지 이동 전 기다려야(await)하는 데이터
    event: await loadEvent(id),
    //페이지 이동 후(데이터 연기하여) 로딩하면 되는 이벤트 리스트 데이터
    events: loadEventsList(),
  });
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
