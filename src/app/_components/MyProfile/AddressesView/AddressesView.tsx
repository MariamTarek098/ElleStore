"use client";
import React, { useState } from 'react';
import { MapPin, Phone, Building, Edit2, Trash2, Plus, X, Globe, Loader2 } from 'lucide-react';
import { UserAddress } from '@/interfaces/product.interface';
import AddressForm from '../../AddressForm/AddressForm';
import { removeAddress } from './Address.action';
import toast from 'react-hot-toast';

export default function AddressesView({ data }: { data: UserAddress[] | undefined }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<UserAddress | null>(null);
 
  const [deletingId, setDeletingId] = useState<string | null>(null);


  const handleAdd = () => {
    setSelectedAddress(null);
    setIsModalOpen(true);
  };

  const handleEdit = (address: UserAddress) => {
    setSelectedAddress(address);
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAddress(null);
  };


  async function handleRemoveAddress(id: string) {
    if (deletingId) return; 

    setDeletingId(id);
    try {
      const res = await removeAddress({ addressId: id });
      
      if (res && res.status === "success") {
        toast.success(res.message);
      } else {
        toast.error("Failed to remove address");
      }
    } catch (error) {
      toast.error("Something went wrong while deleting");
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">

            <div className="flex items-center justify-between p-6 md:p-8 border-b border-slate-100 bg-white shrink-0">
              <div>
                <h3 className="text-xl md:text-2xl font-black text-slate-900">
                  {selectedAddress ? 'Edit Address' : 'Add New Address'}
                </h3>
                <p className="text-xs md:text-sm text-slate-500 font-medium">
                  {selectedAddress ? 'Update your delivery details' : 'Enter your delivery details below'}
                </p>
              </div>
              <button 
                onClick={closeModal}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors group"
              >
                <X className="w-6 h-6 text-slate-400 group-hover:text-[#50829F]" />
              </button>
            </div>

            <AddressForm 
              closeModal={closeModal} 
              selectedAddress={selectedAddress}
            />

          </div>
        </div>
      )}

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">My Addresses</h2>
            <p className="text-sm text-slate-500 font-medium">Manage your delivery locations</p>
          </div>

          <button 
            onClick={handleAdd}
            className="flex items-center justify-center gap-2 bg-[#50829F] hover:bg-[#3d6379] text-white px-6 py-3 rounded-2xl transition-all font-bold text-sm shadow-xl shadow-[#50829F]/20 active:scale-95 w-full sm:w-auto"
          >
            <Plus className="w-5 h-5" />
            Add Address
          </button>
        </div>

        {!data || data.length === 0 ? (
          <div className="border-2 border-dashed border-slate-200 rounded-[2.5rem] p-16 text-center bg-white shadow-sm">
            <div className="flex justify-center mb-6">
              <div className="bg-[#50829F]/10 p-6 rounded-full ring-8 ring-[#50829F]/5">
                <MapPin className="w-10 h-10 text-[#50829F]" />
              </div>
            </div>
            <h3 className="text-xl font-black text-slate-900">No Addresses Found</h3>
            <p className="text-slate-500 mt-3 max-w-xs mx-auto font-medium">
              Looks like you haven't added any addresses yet. Add one to start shopping!
            </p>
            <button 
              onClick={handleAdd}
              className="mt-8 inline-flex items-center gap-2 bg-[#50829F] hover:bg-[#426c85] text-white px-8 py-3.5 rounded-2xl font-black transition-all shadow-xl shadow-[#50829F]/20 active:scale-95"
            >
              <Plus className="w-5 h-5" />
              Add Your First Address
            </button>
          </div>
        ) : (
          <div className="grid gap-5">
            {data.map((address) => (
              <div
                key={address._id}
                className="group border border-slate-100 rounded-[2rem] p-6 flex flex-col sm:flex-row items-start justify-between bg-white shadow-sm hover:shadow-xl hover:border-[#50829F]/20 transition-all duration-300 gap-6"
              >
                <div className="flex items-start gap-5 flex-1">
                  <div className="bg-[#50829F]/10 p-4 rounded-2xl text-[#50829F] shrink-0 group-hover:bg-[#50829F] group-hover:text-white transition-colors duration-300">
                    <MapPin className="w-6 h-6" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-black text-slate-900 text-lg">{address.name}</h3>
                    </div>

                    <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-md">
                      {address.details}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <span className="flex items-center gap-2 bg-slate-50 text-slate-600 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-100">
                        <Phone className="w-3.5 h-3.5 text-[#50829F]" />
                        {address.phone}
                      </span>
                      <span className="flex items-center gap-2 bg-slate-50 text-slate-600 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-100">
                        <Globe className="w-3.5 h-3.5 text-[#50829F]" />
                        {address.city}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex sm:flex-col items-center gap-3 w-full sm:w-auto border-t sm:border-t-0 pt-5 sm:pt-0 border-slate-50">
                  <button 
                    onClick={() => handleEdit(address)}
                    className="flex-1 sm:flex-none p-3 text-slate-400 hover:text-[#50829F] hover:bg-[#50829F]/5 rounded-2xl transition-all border border-transparent hover:border-[#50829F]/10"
                    title="Edit Address"
                  >
                    <Edit2 className="w-5 h-5 mx-auto" />
                  </button>
                  <button 
                    onClick={() => handleRemoveAddress(address._id)}
                    disabled={deletingId === address._id}
                    className="flex-1 sm:flex-none p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all border border-transparent hover:border-red-100 disabled:opacity-50"
                    title="Delete Address"
                  >
                    {deletingId === address._id ? (
                      <Loader2 className="w-5 h-5 mx-auto animate-spin" />
                    ) : (
                      <Trash2 className="w-5 h-5 mx-auto" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}