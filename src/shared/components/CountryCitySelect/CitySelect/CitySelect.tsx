import React, { useEffect, useState } from 'react'
import { CitySelect, GetCity } from 'react-country-state-city'

interface Props {
  countryId: number
  onCityChange: (cityId: number) => void
  stateId: number
}

const CitySelector: React.FC<Props> = ({ countryId, onCityChange, stateId }) => {
  const [cityList, setCityList] = useState<any[]>([])

  useEffect(() => {
    if (countryId && stateId) {
      GetCity(countryId, stateId).then(setCityList)
    }
  }, [countryId, stateId])

  return (
    <div>
      <h6>City</h6>
      <CitySelect
        countryid={countryId}
        onChange={(e: { id: number }) => {
          onCityChange(e.id)
        }}
        placeHolder={'Select City'}
        stateid={stateId}
      />
    </div>
  )
}

export default CitySelector
