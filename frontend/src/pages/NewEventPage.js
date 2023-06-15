import { json, redirect } from "react-router-dom";
import EventForm from "../components/EventForm";

const NewEventPage = () => {
  return <EventForm method="POST" />;
};

export default NewEventPage;

export const action = async ({ request, params }) => {
  const data = await request.formData();

  const newEventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  const response = await fetch(`http://localhost:8080/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newEventData),
  });

  if (!response.ok) {
    throw json(
      { message: "새로운 이벤트를 저장할 수 없습니다!" },
      { status: 500 }
    );
  }

  return redirect("/events");
};
