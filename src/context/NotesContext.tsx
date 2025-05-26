import React, { createContext, useContext, useState, useEffect } from 'react';
import { Note, SortOption } from '../types';

interface NotesContextType {
  notes: Note[];
  searchTerm: string;
  sortOption: SortOption;
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, note: Partial<Omit<Note, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  deleteNote: (id: string) => void;
  setSearchTerm: (term: string) => void;
  setSortOption: (option: SortOption) => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

const COLORS = [
  '#F9FAFB', // Light gray
  '#FEF3C7', // Light yellow
  '#DBEAFE', // Light blue
  '#DCFCE7', // Light green
  '#F3E8FF', // Light purple
  '#FFEDD5', // Light orange
];

export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      return JSON.parse(savedNotes).map((note: any) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt),
      }));
    }
    return [];
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('newest');

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date();
    const newNote: Note = {
      ...note,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
    };
    setNotes([newNote, ...notes]);
  };

  const updateNote = (id: string, updatedFields: Partial<Omit<Note, 'id' | 'createdAt' | 'updatedAt'>>) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? { ...note, ...updatedFields, updatedAt: new Date() }
          : note
      )
    );
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        searchTerm,
        sortOption,
        addNote,
        updateNote,
        deleteNote,
        setSearchTerm,
        setSortOption,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};

export const getRandomColor = () => {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
};