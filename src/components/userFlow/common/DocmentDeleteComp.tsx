import add from '../../../assets/images/add.svg';
import trash from '../../../assets/images/trash.svg';
import {documentDeleteModal} from '../../../utils/hardText/signuppageText';

const DocumentDeleteComp =() =>{
    return(
        <div className="text-gilroy-medium p-[20px] Rectangle153 w-auto md:w-[544px] h-[326px] bg-white rounded-2xl bg-green-200">
            <div className='flex flex-row justify-end'>
                <img src={documentDeleteModal[0].cancelImgSrc} alt="icon"/>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <img src={documentDeleteModal[1].deleteImageSrc} className='w-[52px] h-[52px]' alt="icon"/>
                <p className=" mt-[32px] mb-[40px] text-center text-stone-900 text-2xl font-normal">{documentDeleteModal[2].deleteTxt}<br/>{documentDeleteModal[3].extension}</p>
            </div>
            
            <hr className="bg-[#000000] w-auto md:w-[468px] mb-[24px]"></hr>
            <div className='flex flex-row justify-between px-[12px]'>
                <button className=' Rectangle151 w-56 h-14 rounded-xl border border-lime-900 text-xl font-normal'>{documentDeleteModal[4].cancelBtn}</button>
                <button className='text-white Rectangle151 w-56 h-14 bg-lime-900 rounded-xl'>{documentDeleteModal[4].okayBtn}</button>
            </div>

        </div>
    )
}
export default DocumentDeleteComp;