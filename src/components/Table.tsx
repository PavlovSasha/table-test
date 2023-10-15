import { useMemo, useState } from 'react'
import { Space, Table as AntTable } from 'antd'
import type { TableProps } from 'antd'
import Cell from './Cell'
import { TOption } from '../types/Option'

type RecordType = {
  id: number
  options: TOption[]
  values: {
    level1: string | null
    level2: string | null
    level3: string | null
    level4: string | null
    level5: string | null
  }
}

const getData = (
  count: number,
  options: TOption[],
  values: Record<number, string[]>,
) => {
  const data: RecordType[] = new Array(count).fill(null).map((_, index) => ({
    id: index,
    options,
    values: {
      level1: values[index]?.[0],
      level2: values[index]?.[1],
      level3: values[index]?.[2],
      level4: values[index]?.[3],
      level5: values[index]?.[4],
    },
  }))

  return data
}

type Props = {
  count: number
  result: Record<number, string[]>
  onChange: (value: string, index: number, parentId: number) => void
}

const Table = ({ count, result, onChange }: Props) => {
  const [opts, setOpts] = useState<TOption[]>([])
  const data = useMemo(
    () => getData(count, opts, result),
    [count, opts, result],
  )

  const handleAdd = (value: string, parentId: string | null) => {
    setOpts((prev) => [...prev, { id: value, parentId }])
  }

  const getCellElement = (
    level: keyof RecordType['values'],
    parentLevel: keyof RecordType['values'] | null,
    index: number,
    record: RecordType,
    levelNumber: number,
  ) => (
    <Cell
      options={record.options
        .filter(
          (o) =>
            o.parentId ===
            (parentLevel ? record.values[parentLevel] : parentLevel),
        )
        .map((o) => ({
          value: o.id,
          label: o.id,
        }))}
      value={record.values[level]}
      parentId={parentLevel ? record.values[parentLevel] : null}
      level={levelNumber}
      index={index}
      onChange={onChange}
      onAdd={handleAdd}
    />
  )

  const columns: TableProps<RecordType>['columns'] = [
    {
      dataIndex: 'id',
      width: 100,
    },
    {
      title: 'Уровень 1',
      render: (_data, record, index) =>
        getCellElement('level1', null, index, record, 0),
    },
    {
      title: 'Уровень 2',
      render: (_data, record, index) =>
        record.values.level1
          ? getCellElement('level2', 'level1', index, record, 1)
          : null,
    },
    {
      title: 'Уровень 3',
      render: (_data, record, index) =>
        record.values.level2
          ? getCellElement('level3', 'level2', index, record, 2)
          : null,
    },
    {
      title: 'Уровень 4',
      render: (_data, record, index) =>
        record.values.level3
          ? getCellElement('level4', 'level3', index, record, 3)
          : null,
    },
    {
      title: 'Уровень 5',
      render: (_data, record, index) =>
        record.values.level4
          ? getCellElement('level5', 'level4', index, record, 4)
          : null,
    },
  ]

  return (
    <div style={{ padding: '64px 0' }}>
      <Space direction='vertical' style={{ width: '100%' }}>
        <AntTable
          bordered
          virtual
          columns={columns}
          scroll={{ x: 1000, y: 400 }}
          rowKey='id'
          dataSource={data}
          pagination={false}
        />
      </Space>
    </div>
  )
}

export default Table
