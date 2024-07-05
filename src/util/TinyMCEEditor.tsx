import React, { useRef, useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface TinyMCEEditorProps {
  value: string;
  onEditorChange: (content: string) => void;
}

const TinyMCEEditor: React.FC<TinyMCEEditorProps> = ({ value, onEditorChange }) => {
  const editorRef = useRef<any>(null);
  const [editorContent, setEditorContent] = useState<string>(value);

  useEffect(() => {
    setEditorContent(value); 
  }, [value]);

  return (
    <Editor
      apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
      value={editorContent}
      init={{
        height: 300,
        plugins: [
          'insertdatetime', 'media', 'table', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
        plugin_url: 'https://cdn.tiny.cloud/1/2yifh7kylzpd5szlkd3irl90etvaxhqgknrd2zfbdz4sjeox/tinymce/7.2.1-75/plugins/'
      }}
      onEditorChange={(content) => {
        setEditorContent(content); 
        onEditorChange(content); 
      }}
      ref={editorRef}
    />
  );
};

export default TinyMCEEditor;
