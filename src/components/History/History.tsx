import { useContext } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { AppContext } from 'context/AppContext';
import { AppActions } from 'context/Reducer';
import { getHistory } from 'services/storage';

const History: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  const history = getHistory();

  const makeKey = (item: HistoryItem, index: number) => `${item.date}_${index}`;

  const handleRestore = (item: HistoryItem) => () => {
    const payload = {
      codeSample: item.code,
      codeSampleName: '',
    };

    dispatch({ type: AppActions.LOAD_CODE_SAMPLE, payload });
  };

  return (
    <Dialog
      open={state.historyOpen}
      onClose={() => dispatch({ type: AppActions.HIDE_HISTORY })}
      className="relative z-10"
    >
      <div className="fixed inset-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-2xl transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-gray-900 text-white py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-base font-semibold text-white">
                      Code History
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        data-testid="history-close-btn"
                        type="button"
                        onClick={() =>
                          dispatch({ type: AppActions.HIDE_HISTORY })
                        }
                        className="relative rounded-md bg-gray-900 text-white hover:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden cursor-pointer"
                      >
                        <span className="absolute -inset-2.5" />
                        <span className="sr-only">Close</span>
                        <XMarkIcon aria-hidden="true" className="size-6" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  <div className="h-screen w-full">
                    <div
                      className="w-full divide-y divide-white/5 rounded-xl bg-white/5"
                      data-testid="history-container"
                    >
                      {[...history].reverse().map((item, index) => {
                        return (
                          <Disclosure
                            as="div"
                            key={makeKey(item, index)}
                            className="p-6"
                          >
                            <DisclosureButton className="group flex w-full items-center justify-between cursor-pointer">
                              <span className="text-sm/6 font-medium text-white group-data-hover:text-white/80">
                                ({item.date} #({index + 1})){' - '}
                                {item.code.slice(0, 50)}...
                              </span>
                              <ChevronDownIcon className="size-5 fill-white/60 group-data-hover:fill-white/50 group-data-open:rotate-180" />
                            </DisclosureButton>
                            <DisclosurePanel className="mt-2 text-sm/5 text-white/50">
                              <pre
                                className="
                                bg-gray-800 text-green-200 rounded p-4 font-mono text-xs whitespace-pre-wrap break-words overflow-x-auto border border-gray-700 shadow-inner max-h-64"
                              >
                                {item.code}
                              </pre>
                              <div className="flex justify-end mt-4">
                                <button
                                  type="button"
                                  className="bg-gray-900 text-green-200 rounded px-4 py-1 border border-gray-700 shadow hover:bg-gray-700 hover:text-green-100 focus:outline-none focus:ring-2 focus:ring-green-400 transition cursor-pointer"
                                  onClick={handleRestore(item)}
                                >
                                  Restore
                                </button>
                              </div>
                            </DisclosurePanel>
                          </Disclosure>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default History;
