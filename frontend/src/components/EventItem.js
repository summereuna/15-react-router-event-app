import { Link, useSubmit } from "react-router-dom";
import classes from "./EventItem.module.css";

function EventItem({ event }) {
  const submit = useSubmit();

  const startDeleteHandler = () => {
    const proceed = window.confirm("이벤트를 정말 삭제 하시겠습니까?");

    if (proceed) {
      //이벤트 삭제 액션 트리거
      submit(null, { method: "delete" });
    } else {
      return;
    }
  };

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
