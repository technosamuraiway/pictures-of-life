import React, { useEffect, useState } from 'react'
import { GetCountries } from 'react-country-state-city'

import { Typography } from '@technosamurai/techno-ui-kit'

import s from './CountrySelect.module.scss'

import { DownIcon } from './downIcon'
import { UpIcon } from './upIcon'

interface Country {
  id: number
  name: string
}

interface Props {
  onCountryChange: (countryId: number) => void
}

const CountrySelector: React.FC<Props> = ({ onCountryChange }) => {
  const [countriesList, setCountriesList] = useState<Country[]>([])
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [selectedCountryId, setSelectedCountryId] = useState<null | number>(null)

  useEffect(() => {
    GetCountries().then(result => {
      setCountriesList(result)
      setFilteredCountries(result)
    })
  }, [])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setSearchTerm(value)

    const filtered = countriesList.filter(country =>
      country.name.toLowerCase().includes(value.toLowerCase())
    )

    setFilteredCountries(filtered)
    setIsOpen(filtered.length > 0 && value.length > 0)
  }

  const toggleDropdown = () => {
    setIsOpen(prev => !prev)
  }

  const handleCountrySelect = (country: Country) => {
    setSearchTerm(country.name)
    onCountryChange(country.id)
    setIsOpen(false)
    setSelectedCountryId(country.id)
  }

  return (
    <div>
      <Typography className={s.text} variant={'regular-text-16'}>
        Select your country
      </Typography>
      <div
        className={`${s.selectDiv} ${isFocused ? s.focused : ''} ${isOpen ? s.open : ''}`} // Применяем класс при фокусе
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        tabIndex={0}
      >
        <div style={{ position: 'relative' }}>
          <input
            className={s.input}
            onBlur={() => setIsFocused(false)}
            onChange={handleSearch}
            onFocus={() => setIsFocused(true)}
            onMouseEnter={() => setIsFocused(false)}
            onMouseLeave={() => setIsFocused(true)}
            placeholder={'Country'}
            type={'text'}
            value={searchTerm}
          />
          <button className={s.iconButton} onClick={toggleDropdown} type={'button'}>
            {isOpen ? <UpIcon /> : <DownIcon />}
          </button>
          {isOpen && (
            <div className={s.divList}>
              <ul className={s.ulContainer}>
                {filteredCountries.map(country => (
                  <li
                    className={s.liStyle}
                    key={country.id}
                    onClick={() => handleCountrySelect(country)}
                    style={{
                      color: selectedCountryId === country.id ? 'var(--Primary-100)' : undefined,
                    }}
                  >
                    {country.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CountrySelector
