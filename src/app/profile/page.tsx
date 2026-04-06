import React from 'react';
import Link from 'next/link';
import { User, MapPin, Settings, ChevronRight, Home } from 'lucide-react';
import AddressesView from '../_components/MyProfile/AddressesView/AddressesView';
import SettingsView from '../_components/MyProfile/SettingsView/SettingsView';
import { getUserAddresses } from '@/services/product.services';

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const tab = (await searchParams).tab || 'addresses';

  const data = await getUserAddresses()

  return (
    <div className="min-h-screen bg-slate-50 pb-24">

      <div className="bg-[#50829F] pt-8 md:pt-12 pb-6 md:pb-10 px-4">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <nav className="flex items-center gap-2 text-xs md:text-sm text-white/80 mb-4 md:mb-6 bg-white/10 w-fit px-3 py-1 rounded-full">
            <Link href="/" className="flex items-center hover:text-white">
              <Home className="w-3 h-3 mr-1" /> Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-bold">My Account</span>
          </nav>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 md:p-4 rounded-xl md:rounded-2xl">
              <User className="w-7 h-7 md:w-10 md:h-10 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-4xl font-black text-white">
                My Account
              </h1>
              <p className="text-white/80 text-xs md:text-base">
                Manage your addresses and settings
              </p>
            </div>
          </div>

        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-10 mt-4 md:mt-6 flex flex-col md:flex-row gap-4 md:gap-8">
        <div className="w-full md:w-80">
          <div className="bg-white rounded-2xl p-3 md:p-5 shadow border md:sticky md:top-24">

            <nav className="flex md:flex-col gap-2 overflow-x-auto">

              <Link
                href="/profile?tab=addresses"
                scroll={false}
                className={`flex items-center justify-center md:justify-between flex-1 md:flex-none p-3 md:p-4 rounded-xl text-sm ${
                  tab === 'addresses'
                    ? 'bg-[#50829F] text-white font-bold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="hidden sm:block">Addresses</span>
                </div>
              </Link>

              <Link
                href="/profile?tab=settings"
                scroll={false}
                className={`flex items-center justify-center md:justify-between flex-1 md:flex-none p-3 md:p-4 rounded-xl text-sm ${
                  tab === 'settings'
                    ? 'bg-[#50829F] text-white font-bold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:block">Settings</span>
                </div>
              </Link>

            </nav>

          </div>
        </div>
        <div className="flex-1 bg-white rounded-2xl p-4 md:p-8 shadow min-h-[500px]">
          {tab === 'addresses' ? <AddressesView data={data}/> : <SettingsView />}
        </div>

      </div>
    </div>
  );
}