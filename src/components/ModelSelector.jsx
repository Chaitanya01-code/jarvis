export default function ModelSelector({
  model,
  setModel
}) {
  return (
    <select
      value={model}
      onChange={(e) =>
        setModel(e.target.value)
      }
    >
      <option value="qwen3:8b">
        Qwen3 8B
      </option>

      <option value="llama3.1:8b">
        Llama 3.1 8B
      </option>

      <option value="deepseek-coder-v2:latest">
        DeepSeek Coder
      </option>
    </select>
  );
}