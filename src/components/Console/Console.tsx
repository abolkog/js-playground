import { useContext } from 'react';
import { AppContext } from 'context/AppContext';

const Console: React.FC = () => {
  const { state } = useContext(AppContext);
  const { result, error } = state;

  const createKey = (index: number) => {
    return `key${index}`;
  };

  const renderError = () => {
    return (
      <div data-testid="console-error" className="font-bold text-red-500">
        {error}
      </div>
    );
  };

  const renderResult = () => {
    return result.map((item, index) => {
      const key = createKey(index);
      const isObject = typeof item === 'object' && item !== null;
      const str = JSON.stringify(item);
      const space = isObject && str.length > 60 ? 2 : 0;

      return (
        <div key={key} className="py-1.5">
          <pre>
            <span className="mr-2 text-[#8be9fd]">&#8250;</span>
            <span data-testid={`console-result-item-${index}`}>
              {JSON.stringify(item, null, space)}
            </span>
          </pre>
        </div>
      );
    });
  };

  return (
    <div
      data-testid="console-result"
      className="bg-[#282a36] text-[#f8f8f2] font-mono overflow-x-auto p-4"
    >
      {error ? renderError() : renderResult()}
    </div>
  );
};

export default Console;
