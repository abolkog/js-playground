import { useContext } from 'react';
import _ from 'lodash';
import { AppContext } from 'context/AppContext';

const Console: React.FC = () => {
  const { state } = useContext(AppContext);
  const { result, error } = state;

  const createKey = (index: number) => {
    return `key${index}`;
  };

  if (error) {
    return (
      <div style={{ width: '100%', height: '90%' }} className="console">
        <div data-testid="console-error" className="error">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div data-testid="console-result" className="console">
      {result.map((item, index) => {
        const resut = !_.isString(item) ? JSON.stringify(item) : item;
        return (
          <div key={createKey(index)}>
            <pre>
              <span style={{ marginRight: 5 }}>&#8250;</span>
              <span data-testid={`console-result-item-${index}`}>{resut}</span>
            </pre>
          </div>
        );
      })}
    </div>
  );
};

export default Console;
