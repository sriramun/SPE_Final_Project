import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import NoteForm from './NoteForm';
import { NotesContextProvider } from '../hooks/useNotesContext';
import { AuthContextProvider } from '../hooks/useAuthContext';

const server = setupServer(
  rest.post('/api/notes', (req, res, ctx) => {
    return res(ctx.json({ id: 1, title: 'Test Note', notetext: 'This is a test note', priority: 1 }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders NoteForm component', () => {
  render(
    <AuthContextProvider>
      <NotesContextProvider>
        <NoteForm />
      </NotesContextProvider>
    </AuthContextProvider>
  );

  expect(screen.getByText('Add a New Note')).toBeInTheDocument();
});

test('submits the form and creates a new note', async () => {
  render(
    <AuthContextProvider>
      <NotesContextProvider>
        <NoteForm />
      </NotesContextProvider>
    </AuthContextProvider>
  );

  // Fill in the form fields
  fireEvent.change(screen.getByLabelText(/Note Title/i), { target: { value: 'Test Note' } });
  fireEvent.change(screen.getByLabelText(/Note:/i), { target: { value: 'This is a test note' } });
  fireEvent.change(screen.getByLabelText(/Priority\(0-2\):/i), { target: { value: '1' } });

  // Submit the form
  await act(async () => {
    fireEvent.click(screen.getByText('Add Note'));
  });

  // Check if the note is created
  expect(await screen.findByText('Test Note')).toBeInTheDocument();
});
