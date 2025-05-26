import React from 'react';
import NoteItem from './NoteItem';
import { useNotes } from '../context/NotesContext';
import { Note, SortOption } from '../types';
import { ArrowDownUp } from 'lucide-react';

interface NoteListProps {
  openEditModal: (note: Note) => void;
}

const NoteList: React.FC<NoteListProps> = ({ openEditModal }) => {
  const { notes, searchTerm, sortOption, setSortOption } = useNotes();
  
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sortOption === 'newest') {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    } else if (sortOption === 'oldest') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sortOption === 'alphabetical') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as SortOption);
  };

  if (sortedNotes.length === 0) {
    return (
      <div className="mt-10 text-center">
        {searchTerm ? (
          <p className="text-gray-500">No notes found matching "{searchTerm}"</p>
        ) : (
          <p className="text-gray-500">No notes yet. Create your first note above!</p>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medium text-gray-700">
          {filteredNotes.length} {filteredNotes.length === 1 ? 'Note' : 'Notes'}
        </h2>
        
        <div className="flex items-center gap-2">
          <ArrowDownUp size={16} className="text-gray-500" />
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="bg-white border border-gray-300 text-gray-700 text-sm rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="alphabetical">A-Z</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedNotes.map(note => (
          <NoteItem 
            key={note.id} 
            note={note} 
            openEditModal={openEditModal}
          />
        ))}
      </div>
    </div>
  );
};

export default NoteList;