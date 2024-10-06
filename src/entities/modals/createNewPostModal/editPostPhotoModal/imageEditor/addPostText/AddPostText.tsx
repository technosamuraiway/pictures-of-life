import { KeyboardEvent, useState } from 'react'

import { useRouterLocaleDefinition } from '@/shared'
import { LocationIcon } from '@public/createPost/LocationIcon'
import { Button, Scrollbar, TextField, Typography } from '@technosamurai/techno-ui-kit'
import { v4 as uuid } from 'uuid'

import s from './AddPostText.module.scss'

export const AddPostText = () => {
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
    <div className={s.addPostTextWrapper}>
      <div className={s.postWrapper}>Post</div>
      <div className={s.locationWrapper}>
        <div className={s.locationInputWrapper}>
          <TextField
            inputClassName={s.locationInput}
            label={t.createNewPost.editPhotoModal.locationInputLabel}
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
                  aria-label={'Delete location'}
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
    </div>
  )
}
