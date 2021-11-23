import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRef, useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { constants as c } from '../../../constants';
import { newsActions as a } from '../../../actions/newsActions';
import { getDate, uploadImage } from '../../../helper';
import Loading from './Loading';
export default function NewsAddForm(props) {
  const quillRef = useRef(null);
  const myInput = useRef(null);
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("/img/add_img.png");
  const [selectedFile, setSelectedFile] = useState(null);
  const { status, msg } = useSelector(state => state.news.action.create);
  async function handleImageSelect() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      var file = input.files[0];
      let formData = new FormData();
      formData.append("image", file);
      let url = await uploadImage(formData);
      const range = quillRef.current.getEditorSelection();
      quillRef.current.getEditor().insertEmbed(range.index, 'image', url);
      quillRef.current.getEditor().setSelection(range.index + 1)
    };
  }
  async function handleSubmit() {
    dispatch({ type: c.CREATE_NEWS });
    let formData = new FormData();
    formData.append("image", selectedFile);
    let img = await uploadImage(formData)
    dispatch(a.addNews({
      content,
      title,
      img,
      date: getDate()
    }))
  }
  function handleFileSelect(e) {
    if (!e.target.files)
      return;
    setSelectedFile(e.target.files[0]);
  }
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline'],
          [{ 'align': [] }],
          ['link', 'image'],
          ['clean'],
          [{ 'color': [] }]
        ],
        handlers: {
          image: handleImageSelect
        }

      }
    }
  }, []);
  useEffect(() => {
    if (!selectedFile)
      return;
    let imageUrl = URL.createObjectURL(selectedFile);
    setUrl(imageUrl);
    console.log(imageUrl);
    return () => URL.revokeObjectURL(imageUrl);
  }, [selectedFile])
  return (
    <div className="modal center">
      <div className="form-container">
        <button
          className="close-btn"
          style={
            { zIndex: "10" }
          }
          onClick={props.handleClose}
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="news-form hide-scroll">
          <h3>Bài viết mới</h3>
          <input
            type="text"
            placeholder="Tiêu đề"
            value={title}
            onChange={(e) => { setTitle(e.target.value) }}
          />
          <div className="row">
            <label>Ảnh minh họa</label>
            <input
              ref={myInput}
              type="file"
              accept="image/*"
              className="hide"
              onChange={handleFileSelect}
            />
            <div className="image" onClick={() => myInput.current.click()}>
              <div className="img-container">
                <img src={url} alt="" />
              </div>
            </div>
          </div>
          <ReactQuill
            ref={quillRef}
            modules={modules}
            value={content}
            defaultValue={""}
            placeholder="Nội dung"
            onChange={(v) => setContent(v)}
          />
          {
            msg
              ? <p>{msg}</p>
              : <></>
          }
          <button onClick={handleSubmit}>Đăng bài</button>
          {
            status === c.LOADING
              ? <Loading />
              : <></>
          }
        </div>
      </div>
    </div>
  )
}