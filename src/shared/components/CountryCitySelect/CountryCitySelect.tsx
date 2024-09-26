import React, { useEffect, useState } from 'react'
import { GetCity, GetCountries, GetState } from 'react-country-state-city'

import { useRouterLocaleDefinition } from '@/shared/hooks'
import { DownIcon, Typography, UpIcon } from '@technosamurai/techno-ui-kit'

import s from './CountryCitySelect.module.scss'

interface Location<T> {
  id: T
  name: string
}

type Country = Location<number>
type State = Location<number>
type City = Location<number>

interface Props {
  onCityChange: (cityId: number) => void
  onCountryChange: (countryId: number) => void
  onStateChange: (stateId: number) => void
}

const CountryCitySelector: React.FC<Props> = ({ onCityChange, onCountryChange, onStateChange }) => {
  const [countriesList, setCountriesList] = useState<Country[]>([])
  const [statesList, setStatesList] = useState<State[]>([])
  const [citiesList, setCitiesList] = useState<City[]>([])
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([])
  const [filteredStates, setFilteredStates] = useState<State[]>([])
  const [filteredCities, setFilteredCities] = useState<City[]>([])
  const [searchCountryTerm, setSearchCountryTerm] = useState('')
  const [searchStateTerm, setSearchStateTerm] = useState('')
  const [searchCityTerm, setSearchCityTerm] = useState('')
  const [isCountryOpen, setIsCountryOpen] = useState(false)
  const [isStateOpen, setIsStateOpen] = useState(false)
  const [isCityOpen, setIsCityOpen] = useState(false)
  const [selectedCountryId, setSelectedCountryId] = useState<null | number>(null)
  const [selectedStateId, setSelectedStateId] = useState<null | number>(null)
  const [isFocused, setIsFocused] = useState(false)
  const t = useRouterLocaleDefinition()

  useEffect(() => {
    GetCountries().then(result => {
      setCountriesList(result)
      setFilteredCountries(result)
    })
  }, [])

  const handleCountrySearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setSearchCountryTerm(value)
    const filtered = countriesList.filter(country =>
      country.name.toLowerCase().includes(value.toLowerCase())
    )

    setFilteredCountries(filtered)
    setIsCountryOpen(filtered.length > 0 && value.length > 0)
  }

  const handleStateSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setSearchStateTerm(value)
    const filtered = statesList.filter(state =>
      state.name.toLowerCase().includes(value.toLowerCase())
    )

    setFilteredStates(filtered)
    setIsStateOpen(filtered.length > 0 && value.length > 0)
  }

  const handleCitySearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setSearchCityTerm(value)
    const filtered = citiesList.filter(city =>
      city.name.toLowerCase().includes(value.toLowerCase())
    )

    setFilteredCities(filtered)
    setIsCityOpen(filtered.length > 0 && value.length > 0)
  }

  const toggleCountryDropdown = () => {
    setIsCountryOpen(prev => !prev)
  }

  const toggleStateDropdown = () => {
    setIsStateOpen(prev => !prev)
  }

  const toggleCityDropdown = () => {
    setIsCityOpen(prev => !prev)
  }

  const handleCountrySelect = (country: Country) => {
    setSearchCountryTerm(country.name)
    onCountryChange(country.id)
    setSelectedCountryId(country.id)
    setIsCountryOpen(false)

    setSelectedStateId(null)
    setSearchStateTerm('')
    setStatesList([])

    setFilteredStates([])
    setSearchCityTerm('')
    setCitiesList([])

    GetState(country.id).then(result => {
      setStatesList(result)
      setFilteredStates(result)
      setIsStateOpen(true)
    })
  }

  const handleStateSelect = (state: State) => {
    setSearchStateTerm(state.name)
    setSelectedStateId(state.id)
    onStateChange(state.id)
    setIsStateOpen(false)

    GetCity(selectedCountryId!, state.id).then(result => {
      setCitiesList(result)
      setFilteredCities(result)
      setIsCityOpen(true)
    })
  }

  const handleCitySelect = (city: City) => {
    setSearchCityTerm(city.name)
    onCityChange(city.id)
    setIsCityOpen(false)
  }

  return (
    <div className={s.body}>
      <div className={s.contentDiv}>
        <Typography className={s.text} variant={'regular-text-16'}>
          {t.settingsPage.infoForm.country}
        </Typography>
        <div className={`${s.selectDiv}  `}>
          <div style={{ position: 'relative' }}>
            <input
              className={`${s.input} ${isFocused ? s.focused : ''}`}
              onChange={handleCountrySearch}
              onFocus={() => setIsFocused(true)}
              onMouseEnter={() => setIsFocused(false)}
              onMouseLeave={() => setIsFocused(true)}
              placeholder={t.settingsPage.infoForm.placeCountry}
              type={'text'}
              value={searchCountryTerm}
            />
            <button className={s.button} onClick={toggleCountryDropdown} type={'button'}>
              {isCountryOpen ? <UpIcon className={s.icon} /> : <DownIcon className={s.icon} />}
            </button>
            {isCountryOpen && (
              <div className={s.divList}>
                <ul className={s.ulContainer}>
                  {filteredCountries.map(country => (
                    <li
                      className={s.liStyle}
                      key={country.id}
                      onClick={() => handleCountrySelect(country)}
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
      <div className={s.contentDiv}>
        <Typography className={s.text} variant={'regular-text-16'}>
          {t.settingsPage.infoForm.state}
        </Typography>
        <div className={`${s.selectDiv} `}>
          <div style={{ position: 'relative' }}>
            <input
              className={`${s.input} ${isFocused ? s.focused : ''} ${!selectedCountryId ? s.disabled : ''}`}
              disabled={!selectedCountryId}
              onChange={handleStateSearch}
              onFocus={() => setIsFocused(true)}
              placeholder={t.settingsPage.infoForm.placeState}
              type={'text'}
              value={searchStateTerm}
            />
            <button
              className={`${s.button} ${!selectedCountryId ? s.disabled : ''}`}
              disabled={!selectedCountryId}
              onClick={toggleStateDropdown}
              type={'button'}
            >
              {isStateOpen ? <UpIcon className={s.icon} /> : <DownIcon className={s.icon} />}
            </button>
            {isStateOpen && (
              <div className={s.divList}>
                <ul className={s.ulContainer}>
                  {filteredStates.map(state => (
                    <li
                      className={s.liStyle}
                      key={state.id}
                      onClick={() => handleStateSelect(state)}
                    >
                      {state.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={s.contentDiv}>
        <Typography className={s.text} variant={'regular-text-16'}>
          {t.settingsPage.infoForm.city}
        </Typography>
        <div className={`${s.selectDiv} `}>
          <div style={{ position: 'relative' }}>
            <input
              className={`${s.input} ${isFocused ? s.focused : ''} ${!selectedStateId ? s.disabled : ''}`}
              disabled={!selectedStateId}
              onChange={handleCitySearch}
              onFocus={() => setIsFocused(true)}
              placeholder={t.settingsPage.infoForm.placeCity}
              type={'text'}
              value={searchCityTerm}
            />
            <button
              className={`${s.button} ${!selectedCountryId ? s.disabled : ''}`}
              disabled={!selectedStateId}
              onClick={toggleCityDropdown}
              type={'button'}
            >
              {isCityOpen ? <UpIcon className={s.icon} /> : <DownIcon className={s.icon} />}
            </button>
            {isCityOpen && (
              <div className={s.divList}>
                <ul className={s.ulContainer}>
                  {filteredCities.map(city => (
                    <li className={s.liStyle} key={city.id} onClick={() => handleCitySelect(city)}>
                      {city.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountryCitySelector
