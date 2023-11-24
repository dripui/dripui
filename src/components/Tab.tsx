import { Tab as HeadlessUITab } from '@headlessui/react';
import { FC, PropsWithChildren, JSX } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

interface BaseTabProps {
  className?: string;
  name: string;
  icon?: JSX.Element;
}

const BaseTab = ({ name, icon, className }: BaseTabProps) => {
  return (
    <HeadlessUITab
      className={({ selected }) =>
        twMerge(
          twJoin(
            'relative cursor-pointer select-none rounded bg-transparent px-2 py-1 text-sm hover:bg-gray-100 focus:outline-none',
            'transition duration-100 ease-in-out',

            selected &&
              'font-semibold after:absolute after:bottom-[calc(50%-23px)] after:left-0 after:z-10 after:h-[2px] after:w-[100%] after:rounded after:bg-gradient-to-r after:from-blue-700 after:to-blue-500',
          ),
          className,
        )
      }
    >
      <span className="flex items-center space-x-2">
        {icon}
        <>
          <span
            title={name}
            className="
              after:visibility-hidden after:block after:h-0 after:overflow-hidden after:font-semibold after:content-[attr(title)]
            "
          >
            {name}
          </span>
        </>
      </span>
    </HeadlessUITab>
  );
};

const Panel = ({ children }:PropsWithChildren) => {
  return <HeadlessUITab.Panel className="my-6">{children}</HeadlessUITab.Panel>;
};

interface TabType extends FC<BaseTabProps> {
  List: typeof HeadlessUITab.List;
  Group: typeof HeadlessUITab.Group;
  Panels: typeof HeadlessUITab.Panels;
  Panel: typeof Panel;
}


const MyHeadlessUITab: TabType = Object.assign(BaseTab, {
  List: HeadlessUITab.List,
  Group: HeadlessUITab.Group,
  Panels: HeadlessUITab.Panels,
  Panel,
});
export {
  MyHeadlessUITab as HeadlessUITab
}
