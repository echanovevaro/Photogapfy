import Modal from "../components/Modal";
import UserForm from "../components/UserForm";
import { useNavigate } from "react-router-dom";

function NewUser() {
  const navigate = useNavigate();

  function handleClose() {
    navigate("../");
  }

  return (
    <Modal onClose={handleClose}>
      <UserForm />
    </Modal>
  );
}

export default NewUser;
