import {
  Atom,
  Building2,
  CodeXml,
  Cpu,
  Database,
  Languages,
  Laptop,
  Wrench,
} from 'lucide-react'

const UNIT_ICONS = {
  fcst: Cpu,
  fcs: CodeXml,
  fis: Database,
  fcm: Laptop,
  language: Languages,
  'natural-science': Atom,
  itsm: Wrench,
}

/** The icon for a faculty/department id (data/faculties.js). */
export function UnitIcon({ unitId, className }) {
  const Icon = UNIT_ICONS[unitId] ?? Building2
  return <Icon className={className} />
}
