import { useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  const events = useLoaderData();

  return <EventsList events={events} />;
}

export default EventsPage;

// loader 함수는 사용할 컴포넌트에 따로 아웃소싱 작성하여 export
export const loader = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    //나중에 올바르지 않은 응답상태 처리하기
  } else {
    const resData = await response.json();
    return resData.events;
  }
};
