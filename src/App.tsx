import React, { useState } from 'react';
import { NotesProvider } from './context/NotesContext';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import EditNoteModal from './components/EditNoteModal';
import { Note } from './types';

function App() {
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openEditModal = (note: Note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setEditingNote(null), 200); // Clear note data after modal animation
  };

  return (
    <NotesProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 pb-16">
          <SearchBar />
          <NoteForm />
          <NoteList openEditModal={openEditModal} />
          <EditNoteModal 
            note={editingNote} 
            isOpen={isModalOpen} 
            onClose={closeEditModal} 
          />
        </main>
      </div>
    </NotesProvider>
  );
}

export default App;