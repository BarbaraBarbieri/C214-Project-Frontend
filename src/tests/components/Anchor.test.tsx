import { render, screen, fireEvent } from '@testing-library/react'
import { IconProps } from '../../models/icon-model'
import { AnchorProps } from '../../models/anchor-model'
import Anchor from '../../components/Anchor'
import '@testing-library/jest-dom'

// eslint-disable-next-line react/display-name
jest.mock('../../components/Icon', () => ({ name }: IconProps) => (
    <div data-testid="icon">{name}</div>
))

const defaultProps: AnchorProps = {
    icon: 'House',
    content: 'Início',
    isSelected: '',
    onClick: jest.fn(),
}

describe('Anchor Component', () => {
    it('renders the content and icon correctly', () => {
        render(<Anchor {...defaultProps} />)

        expect(screen.getByText('Início')).toBeInTheDocument()
        expect(screen.getByTestId('icon')).toBeInTheDocument()
        expect(screen.getByTestId('icon')).toHaveTextContent('House')
    })

    it('applies selected class when isSelected matches content', () => {
        const selectedProps = { ...defaultProps, isSelected: 'Início' }
        render(<Anchor {...selectedProps} />)

        const anchorElement = screen.getByText('Início').parentElement
        expect(anchorElement).toHaveClass('bg-orange-400')
    })

    it('does not apply selected class when isSelected does not match content', () => {
        render(<Anchor {...defaultProps} />)

        const anchorElement = screen.getByText('Início').parentElement
        expect(anchorElement).not.toHaveClass('bg-orange-400')
    })

    it('calls onClick with content when clicked', () => {
        const handleClick = jest.fn()
        render(<Anchor {...defaultProps} onClick={handleClick} />)

        const anchorElement = screen.getByText('Início').parentElement
        fireEvent.click(anchorElement!)

        expect(handleClick).toHaveBeenCalledWith('Início')
    })
})
