import AnswerComp from "../../../components/community/AnswerComp";
import { getCookie } from '../../../actions/auth'
import { getProfile } from "../../../actions/user";
import { useState, useEffect } from "react";

const Answer = () => {
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserPhoto, setCurrentUserPhoto] = useState("");

  const token = getCookie("token");

  const init = () => {
    getProfile(token).then((res) => {
      if (res.error) {
        console.log('res.error', res.error)
      } else {
        setCurrentUserName(res.name)
        setCurrentUserPhoto(res.photo)
        setCurrentUserEmail(res.email)
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <React.Fragment>
      <AnswerComp isForAnswerUpdate={false} currentUserName={currentUserName}
      currentUserPhoto={currentUserPhoto} />
    </React.Fragment>
  );
};

export default Answer;
