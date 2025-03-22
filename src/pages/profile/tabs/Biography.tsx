import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Language, ModelProfile } from '../../../types/profile';
import { Bold, Italic, List, ListOrdered } from 'lucide-react';

interface BiographyProps {
  profile: ModelProfile;
  onUpdate: (updates: Partial<ModelProfile>) => void;
}

const MAX_CHARS = 1000;

export default function Biography({ profile, onUpdate }: BiographyProps) {
  const [currentLang, setCurrentLang] = useState<Language>('fr');
  const [charCount, setCharCount] = useState({
    fr: profile.biography.fr.length,
    en: profile.biography.en.length,
  });

  const editor = useEditor({
    extensions: [StarterKit],
    content: profile.biography[currentLang],
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setCharCount(prev => ({
        ...prev,
        [currentLang]: html.length,
      }));
      onUpdate({
        biography: {
          ...profile.biography,
          [currentLang]: html,
        },
      });
    },
  });

  const toggleStyle = (style: string) => {
    if (!editor) return;
    switch (style) {
      case 'bold':
        editor.chain().focus().toggleBold().run();
        break;
      case 'italic':
        editor.chain().focus().toggleItalic().run();
        break;
      case 'bullet':
        editor.chain().focus().toggleBulletList().run();
        break;
      case 'ordered':
        editor.chain().focus().toggleOrderedList().run();
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setCurrentLang('fr')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              currentLang === 'fr'
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Français
          </button>
          <button
            type="button"
            onClick={() => setCurrentLang('en')}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              currentLang === 'en'
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            English
          </button>
        </div>
        <div className="text-sm text-gray-500">
          {charCount[currentLang]}/{MAX_CHARS}
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="bg-white border-b border-gray-200 p-2">
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => toggleStyle('bold')}
              className={`p-2 rounded hover:bg-gray-100 ${
                editor?.isActive('bold') ? 'bg-gray-100' : ''
              }`}
            >
              <Bold className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => toggleStyle('italic')}
              className={`p-2 rounded hover:bg-gray-100 ${
                editor?.isActive('italic') ? 'bg-gray-100' : ''
              }`}
            >
              <Italic className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => toggleStyle('bullet')}
              className={`p-2 rounded hover:bg-gray-100 ${
                editor?.isActive('bulletList') ? 'bg-gray-100' : ''
              }`}
            >
              <List className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => toggleStyle('ordered')}
              className={`p-2 rounded hover:bg-gray-100 ${
                editor?.isActive('orderedList') ? 'bg-gray-100' : ''
              }`}
            >
              <ListOrdered className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="p-4">
          <EditorContent editor={editor} className="prose max-w-none" />
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-sm font-medium text-gray-900">Conseils pour une biographie efficace :</h4>
        <ul className="mt-2 text-sm text-gray-600 list-disc list-inside space-y-1">
          <li>Commencez par une accroche forte qui capte l'attention</li>
          <li>Mettez en avant vos expériences les plus significatives</li>
          <li>Utilisez un ton professionnel mais personnel</li>
          <li>Mentionnez vos spécialités et ce qui vous rend unique</li>
          <li>Concluez avec vos objectifs professionnels</li>
        </ul>
      </div>
    </div>
  );
}