'use client';

import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/customers/buttons';
import { MapHis } from '@/app/ui/customers/Maptrigger'
import InvoiceStatus from '@/app/ui/customers/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredInvoices, fetchFilteredLocationTracking } from '@/app/lib/data';
import { useState, useEffect } from 'react';
import { LocationTrackingTable } from '@/app/lib/definitions';

export default function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  // const LocationTrackings = await fetchFilteredLocationTracking(query, currentPage);
  const getLocationTrackings = async () => {
    const res = await fetch(`/api/user/?query=${query}&page=${currentPage}`, {
      cache: 'no-store'
    });
    return res.json()
  }

  const [LocationTrackings, setLocationTrackings] = useState<LocationTrackingTable[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLocationTrackings();
        setLocationTrackings(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // 初始化数据
    fetchData();

    // 每5秒钟轮询访问API
    const interval = setInterval(fetchData, 5000);

    // 在组件卸载时清除定时器
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {LocationTrackings?.map((LocationTracking: LocationTrackingTable) => (
              <div
                key={LocationTracking.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={'/customers/delba-de-oliveira.png'}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${LocationTracking.name}'s profile picture`}
                      />
                      <p>{LocationTracking.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{LocationTracking.id}</p>
                  </div>
                  <InvoiceStatus status={LocationTracking.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    <MapHis id={LocationTracking.id} />
                    <UpdateInvoice id={LocationTracking.id} />
                    <DeleteInvoice id={LocationTracking.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-5 py-5 font-medium sm:pl-6">
                  User
                </th>
                <th scope="col" className="px-4 py-5 font-medium pr-12">
                  Id
                </th>
                <th scope="col" className="px-4 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {LocationTrackings?.map((LocationTracking: LocationTrackingTable) => (
                <tr
                  key={LocationTracking.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={'/customers/delba-de-oliveira.png'}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${LocationTracking.name}'s profile picture`}
                      />
                      <p>{LocationTracking.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {LocationTracking.id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <InvoiceStatus status={LocationTracking.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-0 pr-3">
                    <div className="flex justify-end gap-3">
                      <MapHis id={LocationTracking.id} />
                      <UpdateInvoice id={LocationTracking.id} />
                      <DeleteInvoice id={LocationTracking.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
