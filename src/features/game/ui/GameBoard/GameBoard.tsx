'use client'

import {
	GameO,
	GameX,
	useGameStore,
	type GameArrayItem,
} from '@/entities/gameMatch'
import { PlayerOIcon, PlayerXIcon } from '@/shared/assets'
import { cn } from '@/shared/lib'
import { type FC } from 'react'
import s from './GameBoard.module.scss'

type GameCellProps = {
	position: number
	cell: GameArrayItem
	disabled?: boolean
}
export const GameCell: FC<GameCellProps> = ({ position, cell, disabled }) => {
	const { move } = useGameStore(state => state.actions)

	return (
		<button
			className={cn(s.cell, cell && s[cell])}
			onClick={() => move(position)}
			disabled={disabled || !!cell}
		>
			{cell === GameX ? (
				<PlayerXIcon />
			) : cell === GameO ? (
				<PlayerOIcon />
			) : null}
		</button>
	)
}

export const GameBoard: FC = () => {
	const board = useGameStore(state => state.board)
	const isYourMove = useGameStore(state => state.isYourMove)

	return (
		<div className={s.board}>
			{board.map((cell, i) => (
				<GameCell
					key={i}
					position={i}
					cell={cell}
					disabled={!isYourMove}
				/>
			))}
		</div>
	)
}
