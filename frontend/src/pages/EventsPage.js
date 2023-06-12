import { Link } from "react-router-dom";

const data = [
  { id: "e1", title: "event 1" },
  { id: "e2", title: "event 2" },
];
const EventsPage = () => {
  return (
    <>
      <h1>Events Page</h1>
      <div>
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <Link to={item.id}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default EventsPage;
