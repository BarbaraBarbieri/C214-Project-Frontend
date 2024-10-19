import { icons } from 'lucide-react'
import { IconProps } from '../models/icon-model'

export default function Icon({ name, color, size }: IconProps) {
  const LucideIcon = icons[name]
  return <LucideIcon color={color} size={size} />
}