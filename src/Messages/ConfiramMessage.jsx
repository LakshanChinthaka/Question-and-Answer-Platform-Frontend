import Swal from "sweetalert2";

function ConfiramMessage() {
    const ConfirmMessage = async (title, text, confirmButtonText, cancelButtonText) => {
        const result = await Swal.fire({
            title,
            text,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText,
            cancelButtonColor: "#d33",
        });

        return result.isConfirmed;
    };

    return {
        ConfirmMessage,
    };
}

export default ConfiramMessage;
