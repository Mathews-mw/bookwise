import { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { Check, List } from '@phosphor-icons/react';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuArrow, DropdownMenuItemIndicator, IconButton } from './styles';
import { api } from '@/lib/axios';
import { ShowSuccessRequest } from '@/utils/ShowSuccessRequest';
import { ShowErrorRequest } from '@/utils/ShowErrorRequest';
import { useQuery } from '@tanstack/react-query';

interface IContextMenuProps {
	bookId: string;
}

export function ContextMenu({ bookId }: IContextMenuProps) {
	const [actionLoading, setActionLoading] = useState(false);

	const [wishRead, setWishRead] = useState(false);
	const [isReading, setIsReading] = useState(false);
	const [alreadyReaded, setAlreadyReaded] = useState(false);

	const { data } = useQuery(['user-book'], async () => {});

	async function handlerUpdateAlreadyReaded(checked: boolean) {
		try {
			setActionLoading(true);

			const { data } = await api.post(`books/${bookId}/user-book`, {
				has_already_read: checked,
			});

			setAlreadyReaded(checked);
			setActionLoading(false);

			ShowSuccessRequest(data);
		} catch (error) {
			setActionLoading(false);
			ShowErrorRequest(error);
		}
	}

	async function handlerUpdateWishRead(checked: boolean) {
		try {
			setActionLoading(true);

			const { data } = await api.post(`books/${bookId}/user-book`, {
				wish_read: checked,
			});

			setWishRead(checked);
			setActionLoading(false);

			ShowSuccessRequest(data);
		} catch (error) {
			setActionLoading(false);
			ShowErrorRequest(error);
		}
	}

	async function handlerUpdateIsReading(checked: boolean) {
		try {
			setActionLoading(true);

			const { data } = await api.post(`books/${bookId}/user-book`, {
				is_reading: checked,
			});

			setIsReading(checked);
			setActionLoading(false);

			ShowSuccessRequest(data);
		} catch (error) {
			setActionLoading(false);
			ShowErrorRequest(error);
		}
	}

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<IconButton aria-label='Customise options'>
					<List size={22} weight='bold' />
				</IconButton>
			</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenuContent sideOffset={5}>
					<DropdownMenuCheckboxItem disabled={actionLoading} checked={alreadyReaded} onCheckedChange={(checked) => handlerUpdateAlreadyReaded(checked)}>
						<DropdownMenuItemIndicator>
							<Check />
						</DropdownMenuItemIndicator>
						Marcar como lido
					</DropdownMenuCheckboxItem>

					<DropdownMenuCheckboxItem disabled={actionLoading} checked={wishRead} onCheckedChange={(checked) => handlerUpdateWishRead(checked)}>
						<DropdownMenuItemIndicator>
							<Check />
						</DropdownMenuItemIndicator>
						Quero ler
					</DropdownMenuCheckboxItem>

					<DropdownMenuCheckboxItem disabled={actionLoading} checked={isReading} onCheckedChange={(checked) => handlerUpdateIsReading(checked)}>
						<DropdownMenuItemIndicator>
							<Check />
						</DropdownMenuItemIndicator>
						Lendo
					</DropdownMenuCheckboxItem>

					<DropdownMenuArrow />
				</DropdownMenuContent>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
}
