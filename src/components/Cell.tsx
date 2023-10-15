import { Button, Select, Space, notification } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useMemo, useState } from 'react'

type TProps = {
  options: { value: string; label: string }[]
  value: string | null
  parentId: string | null
  index: number
  level: number
  onChange: (value: string, index: number, level: number) => void
  onAdd: (value: string, parentId: string | null) => void
}

const Cell = ({
  options,
  value,
  parentId,
  level,
  index,
  onChange,
  onAdd,
}: TProps) => {
  const [search, setSearch] = useState('')

  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        (option?.label ?? '').toLowerCase().includes(search.toLowerCase()),
      ),
    [search, options],
  )

  const handleChange = (value: string) => {
    onChange(value, index, level)
  }

  const addItem = () => {
    if (search.trim().length) {
      onAdd(search, parentId)
      onChange(search, index, level)
    } else {
      notification.open({message: 'Введите непустое значение'})
    }
  }

  return (
    <Select
      showSearch
      placeholder='Выберите'
      onChange={handleChange}
      onSearch={setSearch}
      style={{ width: '100%' }}
      options={filteredOptions}
      value={value}
      dropdownRender={(menu) => (
        <>
          {menu}
          {!filteredOptions.length && (
            <Space style={{ padding: '0 8px 4px' }}>
              <Button type='text' icon={<PlusOutlined />} onClick={addItem}>
                Добавить
              </Button>
            </Space>
          )}
        </>
      )}
    />
  )
}

export default Cell
