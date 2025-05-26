import React, { useState } from 'react';
import { useNotes, getRandomColor } from '../context/NotesContext';
import { PlusCircle } from 'lucide-react';

const NoteForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { addNote } = useNotes();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim() === '' && content.trim() === '') return;
    
    addNote({
      title: title.trim(),
      content: content.trim(),
      color: getRandomColor(),
    });
    
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4 mb-6">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-2 p-2 text-lg font-medium border-b border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
      />
      <textarea
        placeholder="Take a note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        className="w-full p-2 resize-none focus:outline-none"
      />
      <div className="flex justify-end mt-2">
        <button 
          type="submit"
          disabled={title.trim() === '' && content.trim() === ''}
          className="flex items-center gap-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:hover:bg-purple-600"
        >
          <PlusCircle className="w-4 h-4" /> 
          <span>Add Note</span>
        </button>
      </div>
    </form>
  );
};

export default NoteForm;