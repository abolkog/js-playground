import { render, screen } from '@testing-library/react';
import Tab from 'components/Tab';
import { AppContext } from 'context/AppContext';

describe('<Tab />', () => {
  const props: TabProps = {
    tab: {
      id: 'js',
      title: 'JS',
      iconName: 'fab fa-js-square',
      component: () => <div data-testid="tab-component" />,
    },
  };

  it('render tab component correctly', () => {
    render(<Tab {...props} />);

    expect(screen.getByTestId('tab-title').textContent).toEqual(
      props.tab.title
    );
    expect(screen.queryByTestId('tab-component')).toBeInTheDocument();
  });

  it('applies light style if active theme is light', () => {
    const state = {
      theme: 'vs-light',
    } as AppState;

    render(
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      <AppContext.Provider value={{ state, dispatch: jest.fn() }}>
        <Tab {...props} />
      </AppContext.Provider>
    );

    expect(screen.getByTestId('tab-component-wrapper')).toHaveStyle({
      background: '#fff',
      color: '#000',
    });
  });
});
