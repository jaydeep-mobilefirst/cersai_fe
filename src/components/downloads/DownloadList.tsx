import React from 'react';
import DownloadItem from './DownloadItem';
import { downloadsData } from '../../utils/hardText/downloadComponent';

const DownloadList: React.FC = () => {
  return (
    <div className='md:px-[56px] px-[16px] flex flex-wrap gap-y-5 gap-x-10'>
      {downloadsData.map((item) => (
        <DownloadItem key={item.id} title={item.title} />
      ))}
    </div>
  );
};

export default DownloadList;