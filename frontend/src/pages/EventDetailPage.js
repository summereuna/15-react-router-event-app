import { Link, json, useLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

const EventDetailPage = () => {
  const data = useLoaderData();
  console.log(data);

  return (
    <>
      <EventItem event={data.event} />
      <Link to=".." relative="path">
        <span>뒤로 가기</span>
      </Link>
    </>
  );
};

export default EventDetailPage;

//이벤트 세부정보에 대한 loader 함수
export const loader = async (request, params) => {
  const id = request.params.id;

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
