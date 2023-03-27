import { Container } from './styles';

export function DragDropFileInput() {
	return (
		<Container>
			<input type='file' className='input-file-upload' multiple={true} />
			<label className='label-file-upload' htmlFor='input-file-upload'>
				<div>
					<p>Drag and drop your file here or</p>
					<button className='upload-button'>Upload a file</button>
				</div>
			</label>
		</Container>
	);
}
