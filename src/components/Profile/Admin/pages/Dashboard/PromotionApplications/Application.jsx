import { useState } from 'react';
import { GrStatusGood } from 'react-icons/gr';
import {
    HiClipboardDocumentCheck,
    HiOutlineClipboardDocument,
} from 'react-icons/hi2';
import { MdPending, MdOutlineSmsFailed, MdDelete } from 'react-icons/md';
import { TiTick } from 'react-icons/ti';
import { RxCross1 } from 'react-icons/rx';

import { perseDate } from '../../../../../../helpers';

const ID_TAGS = {
    APPLICATION_ID: 'id/application',
    USER_ID: 'id/user',
};

export default function Application({ application }) {
    const { _id, usersId, role, status, createdAt, updatedAt } = application;

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
        <div className='w-[58.875rem] lg:w-full p-2 text-sm text-gray-500 grid grid-cols-12 group/parent'>
            <div className='col-span-2 flex items-center gap-x-[2px]'>
                <span>
                    {copiedId.tag === ID_TAGS.APPLICATION_ID ? (
                        <HiClipboardDocumentCheck className='text-xl text-Primary cursor-pointer' />
                    ) : (
                        <HiOutlineClipboardDocument
                            className='text-xl cursor-pointer'
                            onClick={() => copyId(_id, ID_TAGS.APPLICATION_ID)}
                        />
                    )}
                </span>

                {/* Document Id */}
                <p title={_id} className='text-base text-gray-700 truncate'>
                    {_id}
                </p>
            </div>

            {/* User Id */}
            <div className='col-span-2 flex items-center gap-x-[2px]'>
                <span>
                    {copiedId.tag === ID_TAGS.USER_ID ? (
                        <HiClipboardDocumentCheck className='text-xl text-Primary cursor-pointer' />
                    ) : (
                        <HiOutlineClipboardDocument
                            className='text-xl cursor-pointer'
                            onClick={() => copyId(_id, ID_TAGS.USER_ID)}
                        />
                    )}
                </span>

                {/* User Id */}
                <p title={usersId} className='text-base text-gray-700 truncate'>
                    {usersId}
                </p>
            </div>

            {/* Role */}
            <span title={role} className='ml-5 capitalize truncate col-span-2'>
                {role}
            </span>

            {/* Application Status */}
            <span className='capitalize truncate col-span-2 flex items-center'>
                {status}
                {status === 'pending' ? (
                    <MdPending className='mt-1 ml-1 text-orange-300' />
                ) : status === 'accepted' ? (
                    <GrStatusGood className='mt-1 ml-1 text-green-400' />
                ) : (
                    <MdOutlineSmsFailed className='mt-1 ml-1 text-red-400 text-md' />
                )}
            </span>

            {/* Date */}
            <span className='col-span-2 capitalize truncate'>
                {perseDate(updatedAt || createdAt, 'short')}
            </span>

            {/* Date */}
            <span className='col-span-2 capitalize truncate flex items-center gap-x-2'>
                {status === 'pending' ? (
                    <>
                        <TiTick className='text-2xl cursor-pointer hover:text-green-500' />
                        <RxCross1 className='text-xl cursor-pointer hover:text-red-500' />{' '}
                    </>
                ) : (
                    <MdDelete className='text-xl cursor-pointer hover:text-red-500' />
                )}
            </span>
        </div>
    );
}
