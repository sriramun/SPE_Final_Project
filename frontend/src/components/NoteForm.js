import { useState } from "react"
import { useNotesContext } from "../hooks/useNotesContext"
import { useAuthContext } from '../hooks/useAuthContext'

const NoteForm = () => {
  const { dispatch } = useNotesContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [notetext, setNotetext] = useState('')
  const [priority, setPriority] = useState('')

  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const note = {title, notetext, priority};

    const response = await fetch('/api/notes', {
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('')
      setNotetext('')
      setPriority('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_NOTE', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Note</h3>

      <label>Note Title:</label>
      <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Note:</label>
      <input 
        type="text"
        onChange={(e) => setNotetext(e.target.value)}
        value={notetext}
        className={emptyFields.includes('notetext') ? 'error' : ''}
      />

      <label>Priority(0-2):</label>
      <input 
        type="number"
        onChange={(e) => setPriority(e.target.value)}
        value={priority}
        className={emptyFields.includes('priority') ? 'error' : ''}
      />

      <button>Add Note</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default NoteForm