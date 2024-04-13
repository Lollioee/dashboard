import { ShieldCheckIcon, ShieldExclamationIcon, CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-green-200 text-gray-500': status === 'off',
          'bg-red-500 text-white': status === 'on',
        },
      )}
    >
      {status === 'off' ? (
        <>
          Off
          <ShieldCheckIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'on' ? (
        <>
          On
          <ShieldExclamationIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}