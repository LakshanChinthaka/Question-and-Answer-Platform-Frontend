import Swal from "sweetalert2";

function SuccssAlert() {
  const SuccessMessage = async (title, icon) => {
    const result = await Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        icon,
        title, 
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
    });
    return true; 

    // return result.isConfirmed;
  };

  return {
    SuccessMessage,
  };
}

export default SuccssAlert;
