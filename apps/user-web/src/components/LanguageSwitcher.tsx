import { useState, useEffect } from 'react'
import { Listbox } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const languages = [
  { 
    id: 'en', 
    name: 'English', 
    flag: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="24" height="12">
        <clipPath id="t">
          <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
        </clipPath>
        <path d="M0,0 v30 h60 v-30 z" fill="#00247d"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#cf142b" strokeWidth="4"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#cf142b" strokeWidth="6"/>
      </svg>
    )
  },
  { 
    id: 'ko', 
    name: '한국어', 
    flag: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40" width="24" height="16">
        <rect fill="#fff" width="60" height="40"/>
        <g transform="translate(30,20) scale(1.2)">
          <path fill="#CD2E3A" d="M0,-8a8,8 0 1,1 0,16a4,4 0 1,0 0,-8a4,4 0 1,1 0,-8z"/>
          <path fill="#0047A0" d="M0,8a8,8 0 1,1 0,-16a4,4 0 1,0 0,8a4,4 0 1,1 0,8z"/>
        </g>
        <g fill="#000">
          <path d="M10,10h10v2h-10z M10,13h10v2h-10z M10,16h10v2h-10z"/>
          <path d="M40,10h4v2h-4z M45,10h4v2h-4z M40,13h10v2h-10z M40,16h4v2h-4z M45,16h4v2h-4z"/>
          <path d="M10,22h10v2h-10z M10,25h4v2h-4z M15,25h4v2h-4z M10,28h10v2h-10z"/>
          <path d="M40,22h4v2h-4z M45,22h4v2h-4z M40,25h4v2h-4z M45,25h4v2h-4z M40,28h4v2h-4z M45,28h4v2h-4z"/>
        </g>
      </svg>
    )
  },
  {
    id: 'mn',
    name: 'Монгол',
    flag: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="12" viewBox="0 0 3 2">
        <rect width="3" height="2" fill="#0066B3"/>
        <rect width="1" height="2" fill="#DA2032"/>
        <rect x="2" width="1" height="2" fill="#DA2032"/>
        <polygon points="0.5,0.8 0.4,1.1 0.1,1.1 0.3,1.3 0.2,1.6 0.5,1.4 0.8,1.6 0.7,1.3 0.9,1.1 0.6,1.1" fill="#FFC941"/>
      </svg>
    )
  }
]


function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [isMounted, setIsMounted] = useState(false)
  const [selected, setSelected] = useState(languages[0])

  useEffect(() => {
    setIsMounted(true)
    const currentLanguage = languages.find(l => i18n.language.startsWith(l.id))
    if (currentLanguage) {
      setSelected(currentLanguage)
    }
  }, [i18n.language])

  const changeLanguage = (language: typeof languages[0]) => {
    i18n.changeLanguage(language.id)
    setSelected(language)
  }

  if (!isMounted) {
    return <div className="h-10 w-32" />;
  }

  return (
    <Listbox value={selected} onChange={changeLanguage}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <span className="w-6 h-4 flex items-center justify-center">{selected.flag}</span>
                <span className="ml-3 block truncate">{selected.name}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {languages.map((language) => (
                <Listbox.Option
                  key={language.id}
                  className={({ active }) =>
                    classNames(
                      active ? 'bg-primary-600 text-white' : 'text-gray-900',
                      'relative cursor-default select-none py-2 pl-3 pr-9'
                    )
                  }
                  value={language}
                >
                  {({ selected, active }) => (
                    <>
                      <div className="flex items-center">
                        <span className="w-6 h-4 flex items-center justify-center">{language.flag}</span>
                        <span
                          className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                        >
                          {language.name}
                        </span>
                      </div>

                      {selected ? (
                        <span
                          className={classNames(
                            active ? 'text-white' : 'text-primary-600',
                            'absolute inset-y-0 right-0 flex items-center pr-4'
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </>
      )}
    </Listbox>
  )
}