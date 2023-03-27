import { toast } from 'react-toastify';

const ShowErrorRequest = async (error: any) => {
	let message = 'Tivemos um problema. Tente novamente.';
	if (error.response) {
		if (error.response.data.message) {
			message = error.response.data.message;
		}
	} else if (error.request) {
		message = 'Tempo de espera atingido. Por favor, tente novamente.';
	} else if (error.message) {
		message = error.message;
	}
	toast(message, {
		position: 'top-right',
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		theme: 'dark',
		type: 'error',
	});
};

export { ShowErrorRequest };
