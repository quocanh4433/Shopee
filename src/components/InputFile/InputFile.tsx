import { Fragment, useRef } from 'react';
import { toast } from 'react-toastify';
import config from 'src/constant/config';

interface Props {
  onChange?: (file?: File) => void;
}

export default function InputFile({ onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0];
    fileInputRef.current?.setAttribute('value', '');
    if (fileFromLocal && (fileFromLocal.size >= config.maxSizeUploadAvatar || !fileFromLocal.type.includes('image'))) {
      toast.error(`Dụng lượng file tối đa 1 MB. Định dạng:.JPEG, .PNG`, {});
    } else {
      onChange && onChange(fileFromLocal);
    }
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <Fragment>
      {' '}
      <input
        className='hidden'
        type='file'
        accept='.jpg,.jpeg,.png'
        ref={fileInputRef}
        onChange={onFileChange}
        onClick={(event) => {
          (event.target as any).value = null;
        }}
      />
      <button
        className='flex h-8 items-center justify-end rounded-sm border bg-white px-6 text-xs text-gray-600 shadow-sm md:mx-auto md:h-10 md:text-sm'
        type='button'
        onClick={handleUpload}
      >
        Chọn ảnh
      </button>
    </Fragment>
  );
}
