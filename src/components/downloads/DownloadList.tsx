import React from 'react';
import DownloadItem from './DownloadItem';
import { downloadsData } from '../../utils/hardText/downloadComponent';
import { downloadPageData } from '../../utils/hardText/downloadPageText';

const DownloadList: React.FC = () => {
  return (
    <div className='md:px-[56px] px-[16px] flex flex-wrap gap-y-5 gap-x-10'>
      {downloadPageData?.data?.content?.downloadPageData?.downloads.map((item,index) => (
        <DownloadItem key={index} title={item.text} buttons={downloadPageData?.data?.content?.downloadPageData?.button} />
      ))}
    </div>
  );
};

export default DownloadList;