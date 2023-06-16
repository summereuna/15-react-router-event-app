import { useFetcher } from "react-router-dom";
import classes from "./NewsletterSignup.module.css";
import { useEffect } from "react";

function NewsletterSignup() {
  const fetcher = useFetcher();

  const { data, state } = fetcher;
  useEffect(() => {
    if (state === "idle" && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);

  return (
    <fetcher.Form
      method="POST"
      action="/newsletter"
      className={classes.newsletter}
    >
      <input
        type="email"
        placeholder="뉴스레터 구독하기"
        aria-label="뉴스레터 구독"
      />
      <button>구독</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
