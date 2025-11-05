'use client'

import { formationsDatabase } from '@/lib/formationDatabase'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import type { Formation } from '@/types'
import { useEffect } from 'react'

interface FormationSelectorProps {
  currentFormation: Formation
  onFormationChange: (formation: Formation) => void
}

export function FormationSelector({ currentFormation, onFormationChange }: FormationSelectorProps) {
  // Debug
  useEffect(() => {
    console.log('FormationSelector - currentFormation:', currentFormation)
  }, [currentFormation])

  const handleFormationChange = (formationName: string) => {
    console.log('Cambiando a formación:', formationName)
    const newFormation = formationsDatabase[formationName]
    if (newFormation) {
      // Clonar para evitar mutaciones
      const cloned = JSON.parse(JSON.stringify(newFormation)) as Formation
      onFormationChange(cloned)
    }
  }

  const selectedValue = currentFormation?.name || '4-4-2 Diamond'
  console.log('selectedValue:', selectedValue)

  return (
    <div className="space-y-2">
      <Label htmlFor="formation-select" className="text-sm font-medium text-slate-300">
        Seleccionar Formación
      </Label>
      <Select 
        value={selectedValue} 
        onValueChange={handleFormationChange}
        defaultValue="4-4-2 Diamond"
      >
        <SelectTrigger 
          id="formation-select"
          className="bg-slate-900/50 border-slate-700 text-white focus:ring-orange-500/50 h-11"
        >
          <SelectValue placeholder="Selecciona una formación">
            {selectedValue}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-slate-800 border-slate-600 max-h-[300px]">
          {Object.keys(formationsDatabase).sort().map((name) => (
            <SelectItem 
              key={name} 
              value={name}
              className="text-white hover:bg-slate-700 focus:bg-slate-700 cursor-pointer"
            >
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
