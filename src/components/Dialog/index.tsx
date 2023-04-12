import React, { useState } from 'react';
import * as DialogRadix from '@radix-ui/react-dialog';
import { Container, Button, DialogContent, DialogDescription, DialogOverlay, DialogTitle, Fieldset, Flex, IconButton, Input, Label } from './styles';

export function Dialog() {
	const [container, setContainer] = useState(null);
	return (
		<DialogRadix.Root>
			<DialogRadix.Trigger asChild>
				<Button>Edit profile</Button>
			</DialogRadix.Trigger>
			<DialogRadix.Portal>
				<DialogOverlay />
				<DialogContent>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>Make changes to your profile here. Click save when youre done.</DialogDescription>
					<Fieldset>
						<Label htmlFor='name'>Name</Label>
						<Input id='name' defaultValue='Pedro Duarte' />
					</Fieldset>
					<Fieldset>
						<Label htmlFor='username'>Username</Label>
						<Input id='username' defaultValue='@peduarte' />
					</Fieldset>
					<Flex css={{ marginTop: 25, justifyContent: 'flex-end' }}>
						<DialogRadix.Close asChild>
							<Button variant='green'>Save changes</Button>
						</DialogRadix.Close>
					</Flex>
					<DialogRadix.Close asChild>
						<IconButton aria-label='Close'>x</IconButton>
					</DialogRadix.Close>
				</DialogContent>
			</DialogRadix.Portal>
		</DialogRadix.Root>
	);
}
