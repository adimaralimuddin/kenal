export default function EditHist({ prev, date, className }) {
  return (
    <div style={{ marginTop: 5 }} className={className}>
      <p className="text-blue-300">
        last edited: <small>{new Date(date?.seconds)?.toDateString()}</small>
      </p>
      <p className=" text-gray-400 inline-blockk ">{prev}</p>
    </div>
  );
}
