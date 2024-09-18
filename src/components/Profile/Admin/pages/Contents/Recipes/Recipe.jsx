import { useState } from 'react';
import { BiSolidHide } from 'react-icons/bi';
import { FaCheck } from 'react-icons/fa6';
import { GrStatusGood } from 'react-icons/gr';
import {
    HiClipboardDocumentCheck,
    HiOutlineClipboardDocument,
} from 'react-icons/hi2';
import { MdDelete, MdOutlineSmsFailed, MdPending } from 'react-icons/md';
import { RxCross1 } from 'react-icons/rx';
import { Link } from 'react-router-dom';

const ID_TAGS = {
    RECIPE_ID: 'id/recipe',
    CHEF_ID: 'id/chef',
};

export default function Recipe({ recipe }) {
    const { _id, author, rating, region, status } = recipe;

    const [copiedId, setCopiedId] = useState({ tag: '', copied: false });

    const copyId = async (id, tag) => {
        try {
            await navigator.clipboard.writeText(id);
            setCopiedId({ tag, copied: true });

            // Revert the state to false after 2 seconds
            setTimeout(() => {
                setCopiedId({ tag: '', copied: false });
            }, 2000);
        } catch (error) {
            // do nothing
        }
    };

    return (
        <div className='w-[58.875rem] lg:w-full p-2 text-sm text-gray-500 grid grid-cols-12 group/parent hover:bg-slate-200'>
            <div className='col-span-2 flex items-center gap-x-[2px]'>
                <span>
                    {copiedId.tag === ID_TAGS.RECIPE_ID ? (
                        <HiClipboardDocumentCheck className='text-xl text-Primary cursor-pointer' />
                    ) : (
                        <HiOutlineClipboardDocument
                            className='text-xl cursor-pointer'
                            onClick={() => copyId(_id, ID_TAGS.RECIPE_ID)}
                        />
                    )}
                </span>

                {/* Document Id */}
                <Link
                    to={`/recipes/recipe/${_id}`}
                    className='text-base text-gray-700 truncate hover:text-Primary'
                >
                    {_id}
                </Link>
            </div>

            {/* Chef Id */}
            <div className='col-span-2 flex items-center gap-x-[2px]'>
                <span>
                    {copiedId.tag === ID_TAGS.CHEF_ID ? (
                        <HiClipboardDocumentCheck className='text-xl text-Primary cursor-pointer' />
                    ) : (
                        <HiOutlineClipboardDocument
                            className='text-xl cursor-pointer'
                            onClick={() => copyId(_id, ID_TAGS.CHEF_ID)}
                        />
                    )}
                </span>

                {/* Chef Id */}
                <p className='text-base text-gray-700 truncate'>{author}</p>
            </div>

            {/* Region */}
            <span className='ml-5 capitalize truncate col-span-2'>
                {region}
            </span>

            {/* Rating */}
            <span className='capitalize truncate col-span-2 flex items-center'>
                {rating || 'Null'}
            </span>

            {/* Status */}
            <span className='flex items-center col-span-2 capitalize truncate'>
                {status}
                {status === 'pending' ? (
                    <MdPending className='mt-1 ml-1 text-orange-300' />
                ) : status === 'published' ? (
                    <GrStatusGood className='mt-1 ml-1 text-green-400' />
                ) : (
                    <MdOutlineSmsFailed className='mt-1 ml-1 text-red-400 text-md' />
                )}
            </span>

            {/* Actions */}
            <span className='col-span-2 capitalize truncate flex items-center gap-x-2'>
                {status === 'pending' ? (
                    <>
                        <FaCheck className='text-xl cursor-pointer hover:text-green-500' />
                        <RxCross1 className='text-xl cursor-pointer hover:text-red-500' />{' '}
                    </>
                ) : status === 'published' ? (
                    <button className='px-1 border-2 border-red-500 text-red-500 flex items-center gap-x-1 rounded'>
                        Hide <BiSolidHide className='mt-1' />
                    </button>
                ) : (
                    <MdDelete className='text-xl cursor-pointer hover:text-red-500' />
                )}
            </span>
        </div>
    );
}
