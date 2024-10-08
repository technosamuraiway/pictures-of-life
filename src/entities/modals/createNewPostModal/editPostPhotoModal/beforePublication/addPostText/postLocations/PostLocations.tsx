import { KeyboardEvent, useState } from 'react'

import { useRouterLocaleDefinition } from '@/shared'
import { LocationIcon } from '@public/createPost/LocationIcon'
import { Scrollbar, TextField, Typography } from '@technosamurai/techno-ui-kit'
import { v4 as uuid } from 'uuid'

import s from './PostLocations.module.scss'

export const PostLocations = () => {
  const t = useRouterLocaleDefinition()

  const [locations, setLocations] = useState<string[]>(['New York', 'New York'])
  const [currentLocation, setCurrentLocation] = useState('')

  const addLocation = () => {
    if (currentLocation.trim() !== '') {
      setLocations([...locations, currentLocation.trim()])
      setCurrentLocation('')
    }
  }

  const deleteLocationHandler = (indexToDelete: number) => {
    setLocations(locations.filter((_, index) => index !== indexToDelete))
  }

  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addLocation()
    }
  }

  return (
    <div className={s.locationWrapper}>
      <div className={s.locationInputWrapper}>
        <TextField
          inputClassName={s.locationInput}
          label={t.createNewPost.editPhotoModal.createPost.locationInputLabel}
          onChange={e => setCurrentLocation(e.target.value)}
          onKeyDown={onKeyDownHandler}
          value={currentLocation}
        />
        <LocationIcon className={s.locationIcon} onClick={addLocation} />
      </div>

      <div className={s.placesWrapper}>
        <Scrollbar maxHeight={130}>
          {locations.map((location, index) => (
            <div className={s.locationItem} key={uuid()}>
              <Typography variant={'regular-text-16'}>{location}</Typography>
              <button
                aria-label={'Delete postLocations'}
                className={s.deleteLocationBtn}
                onClick={() => deleteLocationHandler(index)}
                type={'button'}
              >
                x
              </button>
            </div>
          ))}
        </Scrollbar>
      </div>
    </div>
  )
}
