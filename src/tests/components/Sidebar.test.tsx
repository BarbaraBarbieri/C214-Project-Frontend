import { render, screen, fireEvent } from '@testing-library/react'
import { UserContext, UserContextProps } from '../../context/user-context'
import { AnchorProps } from '../../models/anchor-model'
import Sidebar from '../../components/Sidebar'
import '@testing-library/jest-dom';

// eslint-disable-next-line react/display-name
jest.mock('../../components/Anchor', () => ({ content, onClick }: AnchorProps) => (
  <button onClick={() => onClick(content)} data-testid={content}>
    {content}
  </button>
))

const renderSidebar = (contextValue: UserContextProps) => {
  return render(
    <UserContext.Provider value={contextValue}>
      <Sidebar />
    </UserContext.Provider>
  )
}

describe('Sidebar Component', () => {
  const mockUsers = [
    {
      id: '1',
      username: 'john_doe',
      name: 'John Doe',
    },
  ]
  const contextValue: UserContextProps = { users: mockUsers }

  it('renders the user name from context', () => {
    renderSidebar(contextValue)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('renders all Anchor links', () => {
    renderSidebar(contextValue)

    expect(screen.getByTestId('Início')).toBeInTheDocument()
    expect(screen.getByTestId('Fluxo de caixa')).toBeInTheDocument()
    expect(screen.getByTestId('Projeções')).toBeInTheDocument()
  })

  it('updates selected state when an Anchor is clicked', () => {
    renderSidebar(contextValue)

    fireEvent.click(screen.getByTestId('Início'))
    fireEvent.click(screen.getByTestId('Fluxo de caixa'))
    expect(screen.getByTestId('Fluxo de caixa')).toBeInTheDocument()
  })
})
