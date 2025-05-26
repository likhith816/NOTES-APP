import React, { useState, useEffect } from 'react';
import { useNotes } from '../context/NotesContext';
import { Note } from '../types';
import { X } from 'lucide-react';

interface EditNoteModalProps {
  note: Note | null;
  isOpen: boolean;
  onClose: () => void;
}

const COLOR_OPTIONS = [
  { name: 'Default', value: '#F9FAFB' },
  { name: 'Yellow', value: '#FEF3C7' },
  { name: 'Blue', value: '#DBEAFE' },
  { name: 'Green', value: '#DCFCE7' },
  { name: 'Purple', value: '#F3E8FF' },
  { name: 'Orange', value: '#FFEDD5' },
];

const EditNoteModal: React.FC<EditNoteModalProps> = ({ note, isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('');
  const { updateNote } = useNotes();

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setColor(note.color);
    }
  }, [note]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note) return;
    
    updateNote(note.id, {
      title: title.trim(),
      content: content.trim(),
      color
    });
    
    onClose();
  };

  if (!isOpen || !note) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-medium">Edit Note</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="p-4 flex-1 overflow-auto" style={{ backgroundColor: color }}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mb-4 p-2 text-xl font-medium bg-transparent border-b border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
            />
            <textarea
              placeholder="Note content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 min-h-[200px] resize-none bg-transparent focus:outline-none"
            />
          </div>
          
          <div className="p-4 border-t">
            <div className="flex flex-wrap gap-2 mb-4">
              {COLOR_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`w-8 h-8 rounded-full border-2 ${color === option.value ? 'border-purple-600' : 'border-gray-200'}`}
                  style={{ backgroundColor: option.value }}
                  onClick={() => setColor(option.value)}
                  title={option.name}
                />
              ))}
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNoteModal;