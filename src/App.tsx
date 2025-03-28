import { useEffect, useState } from 'react'
import NewsForm from './components/NewsForm'
import NewsList from './components/NewsList'

export type NewsItem = {
	id: number
	title: string
	content: string
}

export default function App() {
	const [news, setNews] = useState<NewsItem[]>(() => {
		const storedNews = localStorage.getItem('news')
		return storedNews ? JSON.parse(storedNews) : []
	})

	useEffect(() => {
		localStorage.setItem('news', JSON.stringify(news))
	}, [news])

	const addNews = (item: Omit<NewsItem, 'id'>) => {
		setNews([...news, { id: Date.now(), ...item }])
	}

	const editNews = (id: number, updatedItem: NewsItem) => {
		setNews(news.map(n => (n.id === id ? updatedItem : n)))
	}

	const deleteNews = (id: number) => {
		setNews(news.filter(n => n.id !== id))
	}

	return (
		<div className='max-w-2xl mx-auto p-4'>
			<h1 className='text-2xl font-bold text-center mb-4'>Новости</h1>
			<NewsForm onAdd={addNews} />
			<NewsList news={news} onEdit={editNews} onDelete={deleteNews} />
		</div>
	)
}
