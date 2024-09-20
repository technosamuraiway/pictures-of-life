declare module 'react-country-state-city' {
    import React from 'react';
  
    export function GetCountries(): Promise<any[]>;
    export function GetState(countryId: number): Promise<any[]>;
    export function GetCity(countryId: number, stateId: number): Promise<any[]>;
    export function GetLanguages(): Promise<any[]>;
  
    export const CitySelect: React.FC<any>;
    export const CountrySelect: React.FC<any>;
    export const StateSelect: React.FC<any>;
    export const LanguageSelect: React.FC<any>;
  }