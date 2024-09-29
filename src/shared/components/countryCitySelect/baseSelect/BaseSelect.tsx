import type { Item } from '../CountryCitySelect'

import { ChangeEvent, useState } from 'react'

import { useRouterLocaleDefinition } from '@/shared'
import { Button, DownIcon, TextField, Typography, UpIcon } from '@technosamurai/techno-ui-kit'
import clsx from 'clsx'

import s from './BaseSelect.module.scss'

interface IProps {
  filteredItems: Item[]
  isItemOpen: boolean
  itemsList: Item[]
  onClickItemSelect: (item: Item) => void
  placeholder: string
  searchItemTerm: string
  selectText: string
  setFilteredItems: (items: Item[]) => void
  setIsFocused: (focus: boolean) => void
  setIsItemOpen: (isItemOpen: boolean) => void
  setSearchItemTerm: (item: string) => void
}

export const BaseSelect = ({
  filteredItems,
  isItemOpen,
  itemsList,
  onClickItemSelect,
  placeholder,
  searchItemTerm,
  selectText,
  setFilteredItems,
  setIsFocused,
  setIsItemOpen,
  setSearchItemTerm,
}: IProps) => {
  // const [itemsList, setItemsList] = useState<Item[]>([])
  // const [searchItemTerm, setSearchItemTerm] = useState<string>('')
  // const [filteredItems, setFilteredItems] = useState<Item[]>([])
  // const [isItemOpen, setIsItemOpen] = useState<boolean>(false)
  // const [selectedItemId, setSelectedItemId] = useState<null | number>(null)
  // const [isFocused, setIsFocused] = useState<boolean>(false)

  const onItemChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value

    setSearchItemTerm(currentValue)
    const filteredArray = itemsList.filter(item =>
      item.name.toLowerCase().includes(currentValue.toLowerCase())
    )

    setFilteredItems(filteredArray)
    setIsItemOpen(filteredArray.length > 0 && currentValue.length > 0)
  }

  const toggleItemDropdownHandler = () => {
    setIsItemOpen(!isItemOpen)
  }

  return (
    <div className={s.wrapper}>
      <Typography className={s.labelText} variant={'regular-text-16'}>
        {selectText}
      </Typography>
      <div className={s.selectWrapper}>
        <div className={s.rootWrapper}>
          <TextField
            className={clsx(s.selectRoot)}
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
            variant={'iconButton'}
          >
            {isItemOpen ? <UpIcon className={s.arrowIcon} /> : <DownIcon className={s.arrowIcon} />}
          </Button>
        </div>
        {isItemOpen && (
          <ul className={s.optionsWrapper}>
            {filteredItems.map(item => (
              <li className={s.item} key={item.id} onClick={() => onClickItemSelect(item)}>
                {item.name}
              </li>
            ))}
          </ul>
        )}
        {/*<input*/}
        {/*  className={`${s.input} ${isFocused ? s.focused : ''}`}*/}
        {/*  onChange={handleCountrySearch}*/}
        {/*  onFocus={() => setIsFocused(true)}*/}
        {/*  onMouseEnter={() => setIsFocused(false)}*/}
        {/*  onMouseLeave={() => setIsFocused(true)}*/}
        {/*  placeholder={t.settingsPage.infoForm.placeCountry}*/}
        {/*  type={'text'}*/}
        {/*  value={searchCountryTerm}*/}
        {/*/>*/}
        {/*<button className={s.button} onClick={toggleCountryDropdown} type={'button'}>*/}
        {/*  {isCountryOpen ? <UpIcon className={s.icon} /> : <DownIcon className={s.icon} />}*/}
        {/*</button>*/}
        {/*{isCountryOpen && (*/}
        {/*  <div className={s.divList}>*/}
        {/*    <ul className={s.ulContainer}>*/}
        {/*      {filteredCountries.map(country => (*/}
        {/*        <li*/}
        {/*          className={s.liStyle}*/}
        {/*          key={country.id}*/}
        {/*          onClick={() => handleCountrySelect(country)}*/}
        {/*        >*/}
        {/*          {country.name}*/}
        {/*        </li>*/}
        {/*      ))}*/}
        {/*    </ul>*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>
    </div>
  )
}
