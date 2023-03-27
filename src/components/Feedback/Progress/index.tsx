import { useEffect, useState } from 'react';
import * as RadixProgress from '@radix-ui/react-progress';

import { ProgressIndicator, ProgressRoot } from './styles';

export function Progress() {
	const [progress, setProgress] = useState(2);

	useEffect(() => {
		const timer = setTimeout(() => setProgress(100), 400);
		return () => clearTimeout(timer);
	}, []);

	return (
		<ProgressRoot value={progress}>
			<ProgressIndicator style={{ transform: `translateX(-${100 - progress}%)` }} />
		</ProgressRoot>
	);
}
