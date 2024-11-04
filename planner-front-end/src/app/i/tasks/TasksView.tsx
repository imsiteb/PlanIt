'use client'

import Loader from '@/components/ui/Loader'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { SwitcherView } from './SwitcherView'
import { ListView } from './list-view/ListView'
import { KanbanView } from './kanban-view/KanbanView'

export type TypeView = 'list' | 'kanban'

export function TasksView() {
	const [type, setType, isLoading] = useLocalStorage<TypeView>({
		key: 'view-type',
		defaultValue: 'list'
	})

	if (isLoading) return <Loader />

	return (
		<div>
			<SwitcherView
				setType={setType}
				type={type}
			/>
			{type === 'list' ? <ListView /> : <KanbanView />}
		</div>
	)
}
