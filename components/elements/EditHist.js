import Comp from "../main/Comp";

const EditHist = ({ data, className }) => {
  return (
    <div style={{ marginTop: 5 }} className={className}>
      <p className="text-blue-300">
        last edited:{" "}
        <small>{new Date(data?.updatedAt?.seconds)?.toDateString()}</small>
      </p>
      <p className=" text-gray-400 inline-blockk ">{data?.prev}</p>
    </div>
  );
};

export default Comp(EditHist);
