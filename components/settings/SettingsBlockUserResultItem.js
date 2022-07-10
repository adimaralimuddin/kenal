import ButtonPrim from "../elements/ButtonPrim";
import UserItem from "../user/UserItem";

export default function BlockUserResultItem({ val, action, text = "block" }) {
  return (
    <div className="flex items-center justify-between">
      <UserItem userId={val?.id} />
      <ButtonPrim
        onClick={() => action?.(val?.id)}
        icon="spam-3"
        className="bg-pink-500 hover:bg-pink-600 "
      >
        {text}
      </ButtonPrim>
    </div>
  );
}
