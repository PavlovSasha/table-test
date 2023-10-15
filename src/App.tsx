import { useState } from 'react'
import { Button, Input, Flex, notification } from 'antd'
import Table from './components/Table'

function App() {
  const [count, setCount] = useState(0)
  const [value, setValue] = useState('')
  const [result, setResult] = useState<Record<number, string[]>>({})

  const handleClick = () => {
    if (!isNaN(+value)) {
      setCount((prev) => (prev += +value))
      setValue('')
    } else {
      notification.open({ message: 'Должно быть число' })
    }
  }

  const handleChange = (value: string, index: number, level: number) => {
    setResult((prev) => ({
      ...prev,
      [index]: prev[index] ? [...prev[index].slice(0, level), value] : [value],
    }))
  }

  const handleSave = () => console.log(result)

  return (
    <>
      <Table count={count} result={result} onChange={handleChange} />
      <Flex justify='flex-start'>
        <Button onClick={handleClick} style={{ marginRight: 12 }}>
          + Добавить строку
        </Button>
        <Input
          type='text'
          onChange={(e) => setValue(e.target.value)}
          value={value}
          style={{ maxWidth: 120 }}
        />
      </Flex>
      <Button onClick={handleSave} type='primary' style={{ marginTop: 12 }}>
        Сохранить
      </Button>
    </>
  )
}

export default App
