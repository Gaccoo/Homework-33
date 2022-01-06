import { AiOutlinePicture } from 'react-icons/ai';
import { TODO } from './item';

type ItemProps = {
  id: number
  todos: TODO[]
  setTodos: (value: TODO[]) => void
}
const FileUploader = ({ todos, setTodos, id }: ItemProps) => {
  const onImageChange = (event: { target: { files: Blob[]; }; }) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newTodos = todos.map((item) => {
          if (item.id === id) {
            return { ...item, file: { image: e.target?.result } };
          }
          return item;
        });
        setTodos(newTodos);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  return (
    <div className="file-uploader">
      <label>
        <input
          style={{ display: 'none' }}
          className="input-file"
          type="file"
  // @ts-ignore
          onChange={onImageChange}
        />
        <AiOutlinePicture className="icon" />
      </label>
    </div>
  );
};

export default FileUploader;
