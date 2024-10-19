import { AnchorProps } from '../models/anchor-model'
import Icon from './Icon'

export default function Anchor({ icon, content, isSelected, onClick }: AnchorProps) {
  return (
    <div id={content} className={`flex gap-2 items-center px-4 py-3 rounded-lg ${isSelected === content ? 'bg-orange-400 hover:bg-orange-400' : 'hover:bg-gray-800'}`} onClick={() => onClick(content)}>
      <Icon name={icon} color='#fff' size={24} />
      <p className='text-white'>{content}</p>
    </div>
  )
}