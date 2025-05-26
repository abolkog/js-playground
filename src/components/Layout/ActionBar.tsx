import { useContext, useEffect, useState } from 'react';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import {
  PlayIcon,
  ShareIcon,
  TrashIcon,
  CodeBracketIcon,
  ClockIcon,
} from '@heroicons/react/24/solid';
import { compressToEncodedURIComponent } from 'lz-string';
import Spinner from 'components/Spinner';
import { AppContext } from 'context/AppContext';
import { AppActions } from 'context/Reducer';
import { CODE_SAMPLES, MAX_SHARE_CODE_LENGTH } from 'helpers/const';
import useCodeRunner from 'hooks/useCodeRunner';

const codeSampleToMenu = CODE_SAMPLES.map(sample => {
  const { codeSample, name } = sample;
  const payload = {
    codeSample,
    codeSampleName: name,
  };

  return {
    label: name,
    payload: { type: AppActions.LOAD_CODE_SAMPLE, payload },
  };
});

const actionBarItems: ActionBarItem[] = [
  {
    label: 'Clear Console',
    icon: TrashIcon,
    payload: { type: AppActions.CLEAR_RESULT },
  },
  {
    label: 'History',
    icon: ClockIcon,
    payload: { type: AppActions.SHOW_HISTORY },
  },
  {
    label: 'Code Samples',
    icon: CodeBracketIcon,
    children: codeSampleToMenu,
  },
];

const ActionBar: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const { runCode } = useCodeRunner();
  const [showShareButton, setShowShareButton] = useState(false);

  useEffect(() => {
    const { code } = state;
    const showShareButton = code.length > 0;
    setShowShareButton(showShareButton);
  }, [state.code.length]);

  const onShareButtonClick = () => {
    const compressedCode = compressToEncodedURIComponent(state.code);
    const shareUrl = `${window.location.origin}/?code=${compressedCode}`;
    if (shareUrl.length > MAX_SHARE_CODE_LENGTH) {
      alert('The code is too long to share. Please reduce the code length.');
      return;
    }
    dispatch({ type: AppActions.SET_SHARE_URL, payload: shareUrl });
  };

  return (
    <nav className="flex flex-1 flex-col">
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" className="-mx-2 space-y-1">
            <li>
              {state.loading ? (
                <span className="text-gray-400 hover:bg-gray-800 hover:text-white group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold cursor-pointer">
                  Running Code ...
                  <Spinner />
                </span>
              ) : (
                <a
                  onClick={() => runCode(state.code)}
                  className="text-gray-400 hover:bg-gray-800 hover:text-white group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold cursor-pointer"
                >
                  Run Code
                  <PlayIcon aria-hidden="true" className="size-5 shrink-0" />
                </a>
              )}
            </li>
            {actionBarItems.map(item => (
              <li key={item.label}>
                {!item.children ? (
                  <a
                    onClick={() => dispatch(item.payload!)}
                    className="text-gray-400 hover:bg-gray-800 hover:text-white group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold cursor-pointer"
                  >
                    {item.label}
                    <item.icon aria-hidden="true" className="size-5 shrink-0" />
                  </a>
                ) : (
                  <Disclosure as="div">
                    <DisclosureButton className="text-gray-400 hover:bg-gray-800 hover:text-white group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold">
                      <ChevronRightIcon
                        aria-hidden="true"
                        className="size-5 shrink-0 text-gray-400 group-data-open:rotate-90 group-data-open:text-gray-500"
                      />
                      {item.label}
                      <item.icon
                        aria-hidden="true"
                        className="size-5 shrink-0"
                      />
                    </DisclosureButton>
                    <DisclosurePanel as="ul" className="mt-1 px-2">
                      {item.children.map(subItem => (
                        <li key={subItem.label}>
                          <DisclosureButton
                            as="a"
                            onClick={() => dispatch(subItem.payload!)}
                            className="text-gray-400 hover:bg-gray-800 hover:text-white group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold cursor-pointer"
                          >
                            {subItem.label}
                          </DisclosureButton>
                        </li>
                      ))}
                    </DisclosurePanel>
                  </Disclosure>
                )}
              </li>
            ))}
            {showShareButton && (
              <li>
                <a
                  onClick={onShareButtonClick}
                  className="text-amber-400 hover:bg-gray-800 hover:amber-600 group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold cursor-pointer"
                >
                  Share Code
                  <ShareIcon aria-hidden="true" className="size-5 shrink-0" />
                </a>
              </li>
            )}
          </ul>
        </li>
        <li className="-mx-6 mt-auto">
          <a
            onClick={() => dispatch({ type: AppActions.SHOW_ABOUT_MODAL })}
            className="text-gray-400 hover:bg-gray-800 hover:text-white group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold cursor-pointer"
          >
            <span className="sr-only">About</span>
            <span>About JS Playground</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default ActionBar;
