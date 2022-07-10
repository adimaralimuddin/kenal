import Icon from "./Icon";

function SearchBox({ placeHolder, className, onChange, autoFocus, onInput }) {
  return (
    <div className={"flex items-center " + className}>
      <div className="flex items-center bg-gray-100 rounded-md px-2 flex-1">
        <Icon>search</Icon>
        <input
          onChange={(e) => onChange?.(e.target.value, e)}
          onInput={(e) => onInput?.(e.target.value, e)}
          autoFocus={autoFocus}
          placeholder={placeHolder || "search..."}
          className="bg-transparent ring-1d ml-1d my-0 p-2 w-full"
        />
      </div>
    </div>
  );
}

export default SearchBox;
