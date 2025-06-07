import { NextRequest, NextResponse } from 'next/server';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// In-memory store (use a database in production)
const todos: Todo[] = [
  { id: 1, title: 'Learn Next.js', completed: false },
  { id: 2, title: 'Build a To-Do API', completed: false },
  { id: 3, title: 'Write code', completed: false },
];

// Handle GET /api/todos
export async function GET() {
  return NextResponse.json(todos);
}

// Handle POST /api/todos
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.title || typeof body.title !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input: "title" is required and must be a string.' },
        { status: 400 }
      );
    }

    const newTodo: Todo = {
      id: todos.length + 1,
      title: body.title.trim(),
      completed: false,
    };

    todos.push(newTodo);
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error('Error creating todo:', error); // ✅ Now error is used
    return NextResponse.json(
      { error: 'Failed to create todo.' },
      { status: 500 }
    );
  }
}
