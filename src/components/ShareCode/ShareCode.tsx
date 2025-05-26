import { useContext } from 'react';
import { AppContext } from 'context/AppContext';
import { AppActions } from 'context/Reducer';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { ShareIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';

const ShareCode: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);

  const closeModal = () => {
    dispatch({
      type: AppActions.SET_SHARE_URL,
      payload: '',
    });
  };

  const onShareButtonClick = async () => {
    await navigator.clipboard.writeText(state.shareUrl);
    closeModal();
  };

  return (
    <Dialog
      open={state.shareUrl.length > 0}
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
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100">
                <ShareIcon
                  aria-hidden="true"
                  className="size-6 text-green-600"
                />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-yellow-500"
                >
                  Share your code
                </DialogTitle>
                <p>Use the following URL to share code</p>
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={state.shareUrl}
                      className="block w-full rounded-md outline-gray-600 bg-gray-600 px-3 py-1.5 text-white outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-300 sm:text-sm/6"
                    />
                    <button
                      type="button"
                      className="p-2 rounded bg-gray-700 hover:bg-gray-600 transition cursor-pointer"
                      onClick={onShareButtonClick}
                      aria-label="Copy to clipboard"
                    >
                      <ClipboardDocumentIcon className="size-5 text-white" />
                    </button>
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

export default ShareCode;
