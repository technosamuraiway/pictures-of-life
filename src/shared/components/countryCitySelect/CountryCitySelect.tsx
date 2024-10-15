import { useEffect, useState } from 'react'
import { GetCity, GetCountries, GetState } from 'react-country-state-city'

import { useRouterLocaleDefinition } from '@/shared/hooks'

import s from './CountryCitySelect.module.scss'

import { BaseSelect } from './baseSelect/BaseSelect'

export type Item = {
  id: number
  name: string
}

interface IProps {
  defaultCityValue?: string
  defaultCountryValue?: string
  defaultStateValue?: string
  onCityChange: (cityName: string) => void
  onCountryChange: (countryName: string) => void
  onStateChange: (stateName: string) => void
}

export const CountryCitySelect = ({
  defaultCityValue,
  defaultCountryValue,
  defaultStateValue,
  onCityChange,
  onCountryChange,
  onStateChange,
}: IProps) => {
  const [countriesList, setCountriesList] = useState<Item[]>([])
  const [statesList, setStatesList] = useState<Item[]>([])
  const [citiesList, setCitiesList] = useState<Item[]>([])

  const [filteredCountries, setFilteredCountries] = useState<Item[]>([])
  const [filteredStates, setFilteredStates] = useState<Item[]>([])
  const [filteredCities, setFilteredCities] = useState<Item[]>([])

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
    defaultCountryValue && setSearchCountryTerm(defaultCountryValue)
    defaultStateValue && setSearchStateTerm(defaultStateValue)
    defaultCityValue && setSearchCityTerm(defaultCityValue)
  }, [defaultCountryValue, defaultStateValue, defaultCityValue])

  const onClickCountrySelectHandler = (country: Item) => {
    setSearchCountryTerm(country.name)
    onCountryChange(country.name)
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

  const onClickStateSelectHandler = (state: Item) => {
    setSearchStateTerm(state.name)
    setSelectedStateId(state.id)
    onStateChange(state.name)
    setIsStateOpen(false)

    GetCity(selectedCountryId!, state.id).then(result => {
      setCitiesList(result)
      setFilteredCities(result)
      setIsCityOpen(true)
    })
  }

  const onClickCitySelectHandler = (city: Item) => {
    setSearchCityTerm(city.name)
    onCityChange(city.name)
    setIsCityOpen(false)
  }

  return (
    <div className={s.mainWrapper}>
      <BaseSelect
        filteredItems={filteredCountries}
        isItemOpen={isCountryOpen}
        itemsList={countriesList}
        labelText={t.settingsPage.infoForm.country}
        onClickItemSelect={onClickCountrySelectHandler}
        placeholder={t.settingsPage.infoForm.placeCountry}
        searchItemTerm={searchCountryTerm}
        setFilteredItems={setFilteredCountries}
        setIsFocused={setIsFocused}
        setIsItemOpen={setIsCountryOpen}
        setSearchItemTerm={setSearchCountryTerm}
      />
      <BaseSelect
        emptyField={t.settingsPage.infoForm.emptyStates}
        filteredItems={filteredStates}
        isItemOpen={isStateOpen}
        itemsList={statesList}
        labelText={t.settingsPage.infoForm.state}
        onClickItemSelect={onClickStateSelectHandler}
        placeholder={t.settingsPage.infoForm.placeState}
        searchItemTerm={searchStateTerm}
        setFilteredItems={setFilteredStates}
        setIsFocused={setIsFocused}
        setIsItemOpen={setIsStateOpen}
        setSearchItemTerm={setSearchStateTerm}
      />
      <BaseSelect
        emptyField={t.settingsPage.infoForm.emptyCities}
        filteredItems={filteredCities}
        isItemOpen={isCityOpen}
        itemsList={citiesList}
        labelText={t.settingsPage.infoForm.city}
        onClickItemSelect={onClickCitySelectHandler}
        placeholder={t.settingsPage.infoForm.placeCity}
        searchItemTerm={searchCityTerm}
        setFilteredItems={setFilteredCities}
        setIsFocused={setIsFocused}
        setIsItemOpen={setIsCityOpen}
        setSearchItemTerm={setSearchCityTerm}
      />
    </div>
  )
}
