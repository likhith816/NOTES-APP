import React, { useState } from 'react';
import { Note } from '../types';
import { useNotes } from '../context/NotesContext';
import { Edit2, Trash2, Check } from 'lucide-react';

interface NoteItemProps {
  note: Note;
  openEditModal: (note: Note) => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, openEditModal }) => {
  const { deleteNote } = useNotes();
  const [isHovering, setIsHovering] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    if (!isDeleting) {
      setIsDeleting(true);
      return;
    }
    deleteNote(note.id);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div 
      className="group relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
      style={{ backgroundColor: note.color }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setIsDeleting(false);
      }}
    >
      <div className="p-4">
        {note.title && (
          <h3 className="text-lg font-medium text-gray-900 mb-2 line-clamp-1">{note.title}</h3>
        )}
        <div className="text-gray-700 mb-4 line-clamp-3 whitespace-pre-line">{note.content}</div>
        <div className="text-xs text-gray-500">
          {note.updatedAt > note.createdAt 
            ? `Updated ${formatDate(note.updatedAt)}` 
            : `Created ${formatDate(note.createdAt)}`}
        </div>
      </div>

      <div className={`absolute top-2 right-2 flex gap-1 transition-opacity duration-200 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={() => openEditModal(note)}
          className="p-1 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 transition-colors"
        >
          <Edit2 size={16} />
        </button>
        <button
          onClick={handleDelete}
          className={`p-1 rounded-full ${isDeleting ? 'bg-red-500 text-white' : 'bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900'} transition-colors`}
        >
          {isDeleting ? <Check size={16} /> : <Trash2 size={16} />}
        </button>
      </div>
    </div>
  );
};

export default NoteItem;