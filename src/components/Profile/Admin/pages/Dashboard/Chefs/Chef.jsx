import { useState } from 'react';
import {
    HiClipboardDocumentCheck,
    HiOutlineClipboardDocument,
} from 'react-icons/hi2';

export default function Chef({ chef }) {
    const { _id, name, email, emailVerified, recipes } = chef;

    const [copiedId, setCopiedId] = useState(false);

    const copyChefId = async () => {
        try {
            await navigator.clipboard.writeText(_id);
            setCopiedId(true);

            // Revert the state to false after 2 seconds
            setTimeout(() => {
                setCopiedId(false);
            }, 2000);
        } catch (error) {
            // do nothing
        }
    };

    return (
        <div className='w-[58.875rem] lg:w-full p-2 text-sm text-gray-500 grid grid-cols-12 group/parent hover:bg-slate-200'>
            <div className='col-span-2 flex items-center gap-x-[2px]'>
                <span>
                    {copiedId ? (
                        <HiClipboardDocumentCheck className='text-xl text-Primary cursor-pointer' />
                    ) : (
                        <HiOutlineClipboardDocument
                            className='text-xl cursor-pointer'
                            onClick={copyChefId}
                        />
                    )}
                </span>

                {/* Chef Id */}
                <p title={_id} className='text-base text-gray-700 truncate'>
                    {_id}
                </p>
            </div>

            {/* Chef Name */}
            <span title={name} className='truncate ml-3 col-span-2'>
                {name}
            </span>

            {/* Email */}
            <span title={email} className='truncate col-span-3'>
                {email}
            </span>

            {/* Email Status */}
            <span className='capitalize truncate col-span-2'>
                {emailVerified ? 'True' : 'False'}
            </span>

            {/* Total Recipes */}
            <span
                title={
                    recipes?.length ? `${recipes?.length} recipes` : `0 recipe`
                }
                className='col-span-3 capitalize truncate group-hover/parent:col-span-2'
            >
                {recipes?.length}
            </span>
        </div>
    );
}
