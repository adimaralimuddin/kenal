export default function PostBodyStyle({ data }) {
  function bodyStyle(a = true, b = false) {
    return (data?.images?.length == 0 || !data?.images) &&
      (data?.vids?.length == 0 || !data?.vids) &&
      data?.body?.length < 200
      ? a
      : b;
  }
  return (
    <div
      style={
        {
          // background: bodyStyle(` center url('/img/storybg1.webp`),
        }
      }
      className={
        "flex-1 px-[4%] text-justify py-2 " +
        bodyStyle(
          " min-h-[220px] bg-gradient-to-br from-purple-300 to-violet-700 py-12 px-[5%] text-white text-xl font-semibold text-center items-center content-center flex flex-col justify-center  dark:brightness-90 ",
          ""
        )
      }
    >
      <p
        className={
          "select-none  " +
          bodyStyle(
            " max-w-sm  text-center ",
            " text-[0.91rem] text-semibold text-slate-600 dark:text-slate-400  "
          )
        }
      >
        {data?.body?.length > 250
          ? data?.body?.substring(0, 250) + " . . . . "
          : data?.body}
      </p>
    </div>
  );
}
