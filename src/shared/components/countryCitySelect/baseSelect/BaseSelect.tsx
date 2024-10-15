import { ChangeEvent, useState } from 'react'

import { Button, DownIcon, Scrollbar, TextField, UpIcon } from '@technosamurai/techno-ui-kit'

import s from './BaseSelect.module.scss'

import { Item } from '../CountryCitySelect'

interface IProps {
  defaultValue?: string
  emptyField?: string
  filteredItems: Item[]
  isItemOpen: boolean
  itemsList: Item[]
  labelText: string
  onClickItemSelect: (item: Item) => void
  placeholder: string
  searchItemTerm: string
  setFilteredItems: (items: Item[]) => void
  setIsFocused: (focus: boolean) => void
  setIsItemOpen: (isItemOpen: boolean) => void
  setSearchItemTerm: (item: string) => void
}

export const BaseSelect = ({
  defaultValue,
  emptyField = 'Empty field',
  filteredItems,
  isItemOpen,
  itemsList,
  labelText,
  onClickItemSelect,
  placeholder,
  searchItemTerm,
  setFilteredItems,
  setIsFocused,
  setIsItemOpen,
  setSearchItemTerm,
}: IProps) => {
  const filterItems = (value: string) => {
    return itemsList.filter(item => item.name.toLowerCase().includes(value.toLowerCase()))
  }

  // useState(() => {
  //   if (defaultValue && defaultValue !== searchItemTerm) {
  //     setSearchItemTerm(defaultValue)
  //     setFilteredItems(filterItems(defaultValue))
  //   }
  // })

  const onItemChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value

    setSearchItemTerm(currentValue)
    const filteredArray = filterItems(currentValue)

    setFilteredItems(filteredArray)
    setIsItemOpen(filteredArray.length > 0)
  }

  const toggleItemDropdownHandler = () => {
    setIsItemOpen(!isItemOpen)
  }

  return (
    <div className={s.wrapper}>
      <div className={s.rootWrapper}>
        <TextField
          defaultValue={searchItemTerm}
          inputClassName={s.selectRoot}
          label={labelText}
          onChange={onItemChangeHandler}
          onFocus={() => setIsFocused(true)}
          onMouseEnter={() => setIsFocused(false)}
          onMouseLeave={() => setIsFocused(true)}
          placeholder={placeholder}
          type={'text'}
          value={searchItemTerm}
        />
        <Button
          className={s.iconButton}
          onClick={toggleItemDropdownHandler}
          type={'button'}
          variant={'iconButton'}
        >
          {isItemOpen ? <UpIcon className={s.arrowIcon} /> : <DownIcon className={s.arrowIcon} />}
        </Button>
      </div>
      {isItemOpen && (
        <ul className={s.optionsWrapper}>
          <Scrollbar maxHeight={200}>
            {filteredItems.length === 0 ? (
              <li className={s.item}>{emptyField}</li>
            ) : (
              filteredItems.map(item => (
                <li className={s.item} key={item.id} onClick={() => onClickItemSelect(item)}>
                  {item.name}
                </li>
              ))
            )}
          </Scrollbar>
        </ul>
      )}
    </div>
  )
}
