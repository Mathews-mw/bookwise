import { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { api } from '@/lib/axios';
import { UserBook } from '@prisma/client';
import { queryClient } from '@/lib/react-query';
import { ShowErrorRequest } from '@/utils/ShowErrorRequest';
import { ShowSuccessRequest } from '@/utils/ShowSuccessRequest';

import { Check, Menu } from 'lucide-react';
import { DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuArrow, DropdownMenuItemIndicator, IconButton } from './styles';

interface IContextMenuProps {
	bookId: string;
	userId?: string;
	userBook?: UserBook;
}

export function ContextMenu({ bookId, userId, userBook }: IContextMenuProps) {
	const [actionLoading, setActionLoading] = useState(false);

	const [wishRead, setWishRead] = useState(false);
	const [isReading, setIsReading] = useState(false);
	const [alreadyReaded, setAlreadyReaded] = useState(false);

	async function handlerUpdateAlreadyReaded(checked: boolean) {
		try {
			setActionLoading(true);

			const { data } = await api.post(`user-book/${bookId}/status-book`, {
				has_already_read: checked,
				wish_read: false,
				is_reading: false,
			});

			setAlreadyReaded(checked);
			setIsReading(false);
			setWishRead(false);

			setActionLoading(false);

			queryClient.invalidateQueries(['searchBook', bookId]);
			queryClient.invalidateQueries(['users_books', userId]);
			ShowSuccessRequest(data);
		} catch (error) {
			setActionLoading(false);
			ShowErrorRequest(error);
		}
	}

	async function handlerUpdateWishRead(checked: boolean) {
		try {
			setActionLoading(true);

			const { data } = await api.post(`user-book/${bookId}/status-book`, {
				wish_read: checked,
				is_reading: false,
				has_already_read: false,
			});

			setWishRead(checked);
			setIsReading(false);
			setAlreadyReaded(false);

			setActionLoading(false);

			queryClient.invalidateQueries(['searchBook', bookId]);
			queryClient.invalidateQueries(['users_books', userId]);
			ShowSuccessRequest(data);
		} catch (error) {
			setActionLoading(false);
			ShowErrorRequest(error);
		}
	}

	async function handlerUpdateIsReading(checked: boolean) {
		try {
			setActionLoading(true);

			const { data } = await api.post(`user-book/${bookId}/status-book`, {
				is_reading: checked,
				has_already_read: false,
				wish_read: false,
			});

			setIsReading(checked);
			setAlreadyReaded(false);
			setWishRead(false);

			setActionLoading(false);

			queryClient.invalidateQueries(['searchBook', bookId]);
			queryClient.invalidateQueries(['users_books', userId]);
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
					<Menu size={22} />
				</IconButton>
			</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenuContent sideOffset={5}>
					<DropdownMenuCheckboxItem
						disabled={actionLoading}
						checked={userBook && userBook.has_already_read ? true : alreadyReaded}
						onCheckedChange={(checked) => handlerUpdateAlreadyReaded(checked)}
					>
						<DropdownMenuItemIndicator>
							<Check />
						</DropdownMenuItemIndicator>
						Marcar como lido
					</DropdownMenuCheckboxItem>

					<DropdownMenuCheckboxItem
						disabled={actionLoading}
						checked={userBook && userBook.wish_read ? true : wishRead}
						onCheckedChange={(checked) => handlerUpdateWishRead(checked)}
					>
						<DropdownMenuItemIndicator>
							<Check />
						</DropdownMenuItemIndicator>
						Quero ler
					</DropdownMenuCheckboxItem>

					<DropdownMenuCheckboxItem
						disabled={actionLoading}
						checked={userBook && userBook.is_reading ? true : isReading}
						onCheckedChange={(checked) => handlerUpdateIsReading(checked)}
					>
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
