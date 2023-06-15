import { useRouteLoaderData } from "react-router-dom";
import EventForm from "../components/EventForm";

function EditEventPage() {
  const data = useRouteLoaderData("event-detail");

  return <EventForm method="GET" event={data.event} />;
}

export default EditEventPage;
