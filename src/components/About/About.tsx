import { useContext } from 'react';
import { LIBRARIES } from 'helpers/const';
import { AppContext } from 'context/AppContext';
import { AppActions } from 'context/Reducer';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Title from 'components/Layout/Title';

const About: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  const closeModal = () => {
    dispatch({
      type: AppActions.HIDE_ABOUT_MODAL,
    });
  };
  return (
    <Dialog
      open={state.aboutModalOpen}
      onClose={closeModal}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-gray-900 text-white/60  px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div>
              <div className="mt-3 sm:mt-5">
                <Title />

                <div className="mt-2 flex flex-1 flex-col gap-3">
                  <p>
                    JS Playground is an experimental JavaScript PlayGround
                    created for Education and Testing Purposes
                  </p>
                  <p>This sandbox playground is hooked up directly with</p>

                  <ul
                    data-testid="about-libraries-list"
                    className="flex flex-1 flex-col gap-3"
                  >
                    {LIBRARIES.map(lib => (
                      <li key={lib.name}>
                        <div className="flex justify-between">
                          <a
                            href={lib.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-yellow-500 font-semibold"
                          >
                            {lib.name}{' '}
                            <span className="text-sm">v{lib.version}</span>
                          </a>
                          <span>
                            Use as{' '}
                            <span className="font-semibold text-yellow-500">
                              {lib.use}
                            </span>
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-4">Enjoy</p>

                  <a
                    href="https://nyala.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-yellow-500 font-semibold underline hover:text-yellow-300"
                  >
                    Khalid Elshafie
                  </a>
                  <div className="mt-6 flex gap-4 justify-center">
                    <a
                      href="https://github.com/abolkog/js-playground/fork"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded border border-gray-700 transition"
                    >
                      Fork on GitHub
                    </a>
                    <a
                      href="https://github.com/abolkog/js-playground"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded transition"
                    >
                      Star on GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default About;
