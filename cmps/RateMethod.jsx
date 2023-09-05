export function RateMethod({ method, val, onSelected }) {
  if (method === 'select') {
    return (
      <select value={val} onChange={(e) => onSelected(e.target.value)}>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
      </select>
    )
  }

  if (method === 'textbox') {
    return (
      <input
        type='number'
        value={val}
        onChange={(e) => onSelected(e.target.value)}
        min='1'
        max='5'
        placeholder='Rate between 1 and 5'
      />
    )
  }

  if (method === 'stars') {
    return (
      <div>
        {[1, 2, 3, 4, 5].map((num) => (
          <span
            key={num}
            onClick={() => onSelected(num)}
            style={{ cursor: 'pointer', color: num <= val ? 'gold' : 'gray' }}>
            ★
          </span>
        ))}
      </div>
    )
  }

  return null
}
