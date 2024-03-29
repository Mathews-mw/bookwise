import { toast } from 'react-toastify';

export const ShowSuccessRequest = (success: any) => {
	let message = 'Operação realizada com sucesso';
	if (success.message) {
		message = success.message;
	}
	toast(message, {
		position: 'top-right',
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		bodyStyle: {
			fontSize: 14,
		},
		theme: 'dark',
		type: 'success',
	});
};
