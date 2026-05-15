import { Check, Palette } from 'lucide-react';
import React from 'react'
import { useState } from 'react';
const ColorPicker = ({selectedColor,onChange}) => {
    const colors = [
        { name: 'Blue', value: '#3B82F6' },
        { name: 'Red', value: '#EF4444' },
        { name: 'Green', value: '#10B981' },
        { name: 'Purple', value: '#8B5CF6' },
        { name: 'Pink', value: '#EC4899' },
        { name: 'Orange', value: '#F59E0B' },
        { name: 'Black', value: '#1F2937' },
        { name: 'Slate', value: '#64748B' }
      ];
      const [isOpen,setIsOpen]=useState(false);
  return (
    <>
    <div className='relative'>
      {/* TRIGGER BUTTON */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className='flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-green-100 border border-green-300 rounded-lg hover:bg-green-200 transition-colors'
      >
        <Palette size={16} color='green' />
        <span className='max-sm:hidden text-green-900'>Accent</span>
      </button>

      {/* DROPDOWN MENU */}
      {isOpen && (
        <div className='absolute top-full left-0 mt-2 w-48 p-4 bg-white border border-gray-200 rounded-xl shadow-xl grid grid-cols-4 gap-3 z-50'>
          {colors.map((color) => (
            <div 
              key={color.value} 
              onClick={() => {
                onChange(color.value);
                setIsOpen(false);
              }} 
              className='group relative flex flex-col items-center gap-1 cursor-pointer'
            >
              {/* THE COLOR CIRCLE */}
              <div 
                className='w-8 h-8 rounded-full border border-gray-200 transition-transform group-hover:scale-110'
                style={{ backgroundColor: color.value }}
              />

              {/* SELECTION CHECKMARK OVERLAY */}
              {selectedColor === color.value && (
                <div className='absolute inset-0 flex items-center justify-center bg-black/20 rounded-full w-8 h-8'>
                  <Check className='w-4 h-4 text-white' />
                </div>
              )}

              {/* COLOR NAME LABEL */}
              <p className='text-[10px] text-gray-500 font-medium'>{color.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  )
}

export default ColorPicker
