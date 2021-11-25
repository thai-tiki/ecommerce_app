import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useRef, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from '../../../helper';
import { newsActions } from "../../../actions/newsActions";
import { constants as c } from "../../../constants";
import NewsAddForm from "./NewsAddForm";
export default function NewsTab() {
  const quillRef = useRef(null);
  const dispatch = useDispatch();
  const news = useSelector(state => state.news.list);
  const [content, setContent] = useState("");
  const [currentNews, setCurrentNews] = useState({});
  const [currentForm, setCurrentForm] = useState("none");
  const forms = {
    "none": <></>,
    "add": <NewsAddForm handleClose={() => setCurrentForm("none")} />
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
  useEffect(() => {
    if (news.status === c.LOADING)
      dispatch(newsActions.getAllNews(""));
    if (news.status === c.SUCCESS) {
      setCurrentNews(news.data[0]);
      setContent(news.data[0].content);
    }
  }, [news]);
  return (
    <div className="news-tab tab">
      <div className="row">
        <div className="news-list">
          <div className="row">
            <h4>Danh sách bài viết</h4>
            <button
              className="add-btn"
              onClick={() => { setCurrentForm("add") }}>
              Bài viết mới <i className="fas fa-plus"></i>
            </button>
          </div>
          <div className="table-fixed">
            <table>
              <thead>
                <tr>
                  <th className="id">No.</th>
                  <th className="title" style={{ maxWidth: "300px" }}>Tiêu đề</th>
                </tr>
              </thead>
              <tbody style={{}}>
                {
                  news.data.map((v, i) =>
                    <tr key={v._id} onClick={() => { setCurrentNews(v); setContent(v.content) }}>
                      <td className="id" style={{ width: "45px" }}>{i + 1}</td>
                      <td className="title" style={{ maxWidth: "300px", padding: "10px" }}>{v.title}</td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
        <div className="news-update">
          <div className="row">
            <input
              type="text"
              placeholder="Tiêu đề"
              value={currentNews}
              onChange={(e) => setCurrentNews({ ...currentNews, title: e.target.value })}
            />
            <button>Cập nhật</button>
          </div>
          <ReactQuill
            ref={quillRef}
            modules={modules}
            value={content}
            defaultValue={""}
            placeholder={"Nội dung"}
            onChange={(v) => setContent(v)}
          />
        </div>
      </div>
      {forms[currentForm]}
    </div>
  )
}