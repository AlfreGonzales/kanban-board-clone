import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const useAlert = () => {
  const showAlert = ({ type, title }) => {
    MySwal.fire({
      position: type === "success" ? "top-end" : "center",
      title,
      icon: type,
      showConfirmButton: type === "success" ? false : true,
      timer: type === "success" ? 1500 : null,
    });
  };

  return { showAlert };
};
