'use client'
import React, { useState } from 'react'
import { UserAddress } from '@/interfaces/product.interface';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { addAddress, AddressInput, removeAddress } from '../MyProfile/AddressesView/Address.action';

//  Schema 
const AddressSchema = z.object({
  name: z.string().min(2, "Label is required (e.g. Home)"),
  details: z.string().min(5, "Please provide full address details"),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
  city: z.string().min(2, "City is required"),
});

type AddressData = z.infer<typeof AddressSchema>;

interface AddAddressFormProps {
  closeModal: () => void;
  selectedAddress: UserAddress | null;
}

export default function AddressForm({ closeModal, selectedAddress }: AddAddressFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressData>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      name: selectedAddress?.name || '',
      details: selectedAddress?.details || '',
      phone: selectedAddress?.phone || '',
      city: selectedAddress?.city || '',
    }
  });

const onSubmit = async (values: AddressData) => {
  setIsLoading(true);
  try {
    if (selectedAddress) {
      const deleteRes = await removeAddress({ addressId: selectedAddress._id });
      if (!deleteRes) {
        throw new Error("Could not remove old address for update");
      }
    }

    const payload: AddressInput = {
      name: values.name,
      details: values.details,
      phone: values.phone,
      city: values.city,
    };

    const response = await addAddress(payload); 
    
    if (response && response.status === 'success') {
      toast.success(selectedAddress ? "Address updated successfully" : "Address added successfully");
      router.refresh(); 
      closeModal();
    } else {
      toast.error(response?.message || "Failed to save address");
    }
  } catch (err: any) {
    toast.error(err.message || "An unexpected error occurred");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 overflow-y-auto m-0">
      <div className="p-6 md:p-8 space-y-5 flex-1">
        
        {/* Name Input */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Address Label</label>
          <input 
            {...register('name')}
            placeholder="e.g. Office" 
            className={`w-full px-5 py-3.5 rounded-2xl border ${errors.name ? 'border-red-500' : 'border-slate-200'} outline-none focus:border-[#50829F] focus:ring-4 focus:ring-[#50829F]/5 transition-all text-sm`}
          />
          {errors.name && <p className="text-red-500 text-[10px] mt-1 ml-1 font-bold">{errors.name.message}</p>}
        </div>

        {/* Details Input */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Detailed Address</label>
          <textarea 
            {...register('details')}
            placeholder="Street, Building, Floor/Apartment..." 
            rows={3}
            className={`w-full px-5 py-3.5 rounded-2xl border ${errors.details ? 'border-red-500' : 'border-slate-200'} outline-none focus:border-[#50829F] focus:ring-4 focus:ring-[#50829F]/5 transition-all text-sm resize-none`}
          />
          {errors.details && <p className="text-red-500 text-[10px] mt-1 ml-1 font-bold">{errors.details.message}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Phone */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Phone</label>
            <input 
              {...register('phone')}
              type="tel" 
              placeholder="01xxxxxxxxx" 
              className={`w-full px-5 py-3.5 rounded-2xl border ${errors.phone ? 'border-red-500' : 'border-slate-200'} outline-none focus:border-[#50829F] focus:ring-4 focus:ring-[#50829F]/5 transition-all text-sm`}
            />
            {errors.phone && <p className="text-red-500 text-[10px] mt-1 ml-1 font-bold">{errors.phone.message}</p>}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">City</label>
            <input 
              {...register('city')}
              placeholder="e.g. Cairo" 
              className={`w-full px-5 py-3.5 rounded-2xl border ${errors.city ? 'border-red-500' : 'border-slate-200'} outline-none focus:border-[#50829F] focus:ring-4 focus:ring-[#50829F]/5 transition-all text-sm`}
            />
            {errors.city && <p className="text-red-500 text-[10px] mt-1 ml-1 font-bold">{errors.city.message}</p>}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-4 p-6 md:p-8 bg-slate-50/80 border-t border-slate-100 mt-auto">
        <button 
          type="button" 
          onClick={closeModal}
          disabled={isLoading}
          className="flex-1 py-4 px-6 rounded-2xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-50 transition-all active:scale-95"
        >
          Cancel
        </button>
        <button 
          type="submit"
          disabled={isLoading}
          className="flex-1 py-4 px-6 rounded-2xl font-bold text-white bg-[#50829F] hover:bg-[#426c85] shadow-xl shadow-[#50829F]/30 disabled:opacity-50 transition-all flex justify-center items-center active:scale-95"
        >
          {isLoading ? (
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            selectedAddress ? 'Update Address' : 'Add Address'
          )}
        </button>
      </div>
    </form>
  )
}
