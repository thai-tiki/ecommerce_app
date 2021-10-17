export default function NoteInput(props) {
  return (
    <div className="voucher-input">
      <h5>Ghi chú</h5>
      <div className="row">
        <input
          type="text"
          placeholder="Nhập ghi chú"
          value={props.note ? props.note : ""}
          onChange={(e) => props.handleChange("note", e.target.value)}
        />
      </div>
    </div>
  )
}