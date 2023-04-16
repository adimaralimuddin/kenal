const ToolTextWrapper = (text = "", max = 200) => {
  if (text?.length >= max) {
    return text?.slice(0, max) + " . . . ";
  }
  return text;
};

export default ToolTextWrapper;
