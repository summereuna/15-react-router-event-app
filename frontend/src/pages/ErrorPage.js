import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";

function ErrorPage() {
  const error = useRouteError();
  console.log(error);
  let title = "에러 발생!";
  let message = "뭔가 잘못 되었습니다!";

  //이벤트 페치 실패 시
  if (error.status === 500) {
    message = JSON.parse(error.data).message;
    //JSON형식을 파싱한 후 message에 액세스
  }

  //지원하지 않는 경로 접근 시
  if (error.status === 404) {
    title = "404 Not Found!";
    message = "리소스 또는 페이지를 찾을 수 없습니다.";
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
