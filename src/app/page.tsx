import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme/theme-toggle'
import { db } from '@/db'
import { todo } from '@/db/schema'
import { revalidatePath } from 'next/cache'

async function addTodo(formData: FormData) {
  'use server'

  const text = formData.get('text')

  if (!text) {
    return
  }

  const newTodo: typeof todo.$inferInsert = {
    id: Math.floor(Math.random() * 10000),
    text: text as string,
  }

  await db.insert(todo).values(newTodo)

  revalidatePath('/')
}

export default async function HomePage() {
  const todos = await db.select().from(todo)

  return (
    <div className='p-4 space-y-4'>
      <h1>Home Page</h1>
      <ThemeToggle />
      <form action={addTodo}>
        <div className='flex items-center gap-2'>
          <input
            id='text'
            type='text'
            name='text'
            className='border px-2 py-1 rounded-md bg-muted'
            placeholder='Add a todo'
          />
          <Button type='submit' variant='outline'>
            Add
          </Button>
        </div>
      </form>
      {todos.length ? (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.text}</li>
          ))}
        </ul>
      ) : (
        <p>No todos yet</p>
      )}
    </div>
  )
}
