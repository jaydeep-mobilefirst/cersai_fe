import React from 'react';
import DownloadItem from './DownloadItem';
import { downloadsData } from '../../utils/hardText/downloadComponent';
import { downloadPageData } from '../../utils/hardText/downloadPageText';
import { useDownloadStore } from '../../zust/useDownloadStore';

const DownloadList: React.FC = () => {

  const { downloadPageDataa } = useDownloadStore((state) => state);
  return (
    <div className='md:px-[56px] px-[16px] flex flex-wrap gap-y-5 gap-x-10'>
      {downloadPageDataa?.downloads?.map((item:any,index:any) => (
        <DownloadItem key={index} title={item?.text} link={item?.link} buttons={downloadPageDataa?.button} />
      ))}
    </div>
  );
};

export default DownloadList;