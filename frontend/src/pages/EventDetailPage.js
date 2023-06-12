import { Link, useParams } from "react-router-dom";

const EventDetailPage = () => {
  const params = useParams();
  const id = params.id;

  return (
    <>
      <h1>Event Detail Page</h1>
      <p>Event ID: {id}</p>
      <Link to=".." relative="path">
        <span>뒤로 가기</span>
      </Link>
    </>
  );
};

export default EventDetailPage;
